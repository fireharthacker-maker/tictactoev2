import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

type Cell = 'X' | 'O' | null;
type GameResult =
  | { type: 'win'; winner: 'X' | 'O'; line: number[] }
  | { type: 'draw' }
  | { type: 'playing' };
type GameMode = 'computer' | 'human';
type Difficulty = 'easy' | 'medium' | 'hard';

// Winning combinations for tic-tac-toe
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

// Check if there's a winner or if the game is a draw
function checkGameResult(board: Cell[]): GameResult {
  // Check for winner
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        type: 'win',
        winner: board[a] as 'X' | 'O',
        line: [a, b, c]
      };
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return { type: 'draw' };
  }

  return { type: 'playing' };
}

// Get available moves
function getAvailableMoves(board: Cell[]): number[] {
  return board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null) as number[];
}

// Minimax algorithm cache for performance
const minimaxCache = new Map<string, number>();

function getBoardKey(board: Cell[], player: Cell): string {
  return `${board.map(c => c ?? '_').join('')}|${player}`;
}

// Minimax algorithm - unbeatable AI
function minimax(board: Cell[], player: Cell, depth: number = 0): number {
  const key = getBoardKey(board, player);
  if (minimaxCache.has(key)) {
    return minimaxCache.get(key)!;
  }

  const result = checkGameResult(board);

  // Terminal states
  if (result.type === 'win') {
    const score = result.winner === 'X' ? 10 - depth : depth - 10;
    minimaxCache.set(key, score);
    return score;
  }

  if (result.type === 'draw') {
    minimaxCache.set(key, 0);
    return 0;
  }

  const moves = getAvailableMoves(board);
  let bestScore = player === 'X' ? -Infinity : Infinity;

  for (const move of moves) {
    board[move] = player;
    const score = minimax(board, player === 'X' ? 'O' : 'X', depth + 1);
    board[move] = null;

    if (player === 'X') {
      bestScore = Math.max(bestScore, score);
      if (bestScore === 10 - depth) break; // Alpha-beta pruning
    } else {
      bestScore = Math.min(bestScore, score);
      if (bestScore === depth - 10) break; // Alpha-beta pruning
    }
  }

  minimaxCache.set(key, bestScore);
  return bestScore;
}

// Find the best move for the AI based on difficulty
function getBestMove(board: Cell[], player: Cell, difficulty: Difficulty): number | null {
  const moves = getAvailableMoves(board);
  if (moves.length === 0) return null;

  // Easy: Make random moves (computer plays poorly)
  if (difficulty === 'easy') {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // Medium: Mix of random (40%) and optimal (60%) moves
  if (difficulty === 'medium') {
    if (Math.random() < 0.4) {
      return moves[Math.floor(Math.random() * moves.length)];
    }
  }

  // Hard: Always use minimax (optimal play)
  let bestMove = moves[0];
  let bestScore = player === 'X' ? -Infinity : Infinity;

  for (const move of moves) {
    board[move] = player;
    const score = minimax(board, player === 'X' ? 'O' : 'X');
    board[move] = null;

    if (player === 'X' ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [humanPlayer, setHumanPlayer] = useState<'X' | 'O'>('X');
  const [isThinking, setIsThinking] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('computer');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [showSymbolDialog, setShowSymbolDialog] = useState(false);
  const { toast } = useToast();

  const aiPlayer = humanPlayer === 'X' ? 'O' : 'X';
  const gameResult = useMemo(() => checkGameResult(board), [board]);

  // Determine whose turn it is
  const getCurrentPlayer = (currentBoard: Cell[]): 'X' | 'O' => {
    const moveCount = currentBoard.filter(cell => cell !== null).length;
    return moveCount % 2 === 0 ? 'X' : 'O';
  };

  const currentPlayer = getCurrentPlayer(board);

  // AI move effect (only for computer vs human mode)
  useEffect(() => {
    if (gameResult.type !== 'playing' || gameMode !== 'computer') return;

    if (currentPlayer === aiPlayer) {
      setIsThinking(true);

      const timer = setTimeout(() => {
        const bestMove = getBestMove([...board], aiPlayer, difficulty);
        if (bestMove !== null) {
          setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[bestMove] = aiPlayer;
            return newBoard;
          });
        }
        setIsThinking(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, aiPlayer, board, gameResult.type, gameMode, difficulty]);

  // Handle cell click
  const handleCellClick = (index: number) => {
    if (gameResult.type !== 'playing') return;
    if (board[index] !== null) return;
    if (isThinking) return;

    // In human vs human mode, alternate between players
    if (gameMode === 'human') {
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[index] = currentPlayer;
        return newBoard;
      });
    } else {
      // In computer vs human mode, only allow human player's turn
      if (currentPlayer !== humanPlayer) return;
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[index] = humanPlayer;
        return newBoard;
      });
    }
  };

  // Start new game (keeps mode and player selections)
  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setIsThinking(false);
    minimaxCache.clear();
  };

  // Complete reset
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setHumanPlayer('X');
    setGameMode('computer');
    setDifficulty('easy');
    setIsThinking(false);
    setShowSymbolDialog(false);
    minimaxCache.clear();
  };

  // Handle symbol selection from dialog
  const handleSymbolSelect = (symbol: 'X' | 'O') => {
    setHumanPlayer(symbol);
    setShowSymbolDialog(false);
  };

  // Get game status message
  const getStatusMessage = (): string => {
    if (gameMode === 'human') {
      if (gameResult.type === 'win') {
        return `🎉 ${gameResult.winner} wins!`;
      }
      if (gameResult.type === 'draw') return "🤝 It's a draw! Well played!";
      return `${currentPlayer}'s turn`;
    }

    // Computer vs Human mode
    if (gameResult.type === 'win') {
      if (gameResult.winner === humanPlayer) {
        return difficulty === 'easy'
          ? "🎉 You won! Great job!"
          : "🎉 You won! (That shouldn't happen on hard mode...)";
      }
      return "🤖 Computer wins! Try again?";
    }
    if (gameResult.type === 'draw') return "🤝 It's a draw! Well played!";
    if (isThinking) return "🤖 Computer is thinking...";
    return currentPlayer === humanPlayer ? "🎯 Your turn!" : "⏳ Computer's turn...";
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Symbol Selection Dialog */}
      <Dialog open={showSymbolDialog} onOpenChange={setShowSymbolDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Choose Your Symbol</DialogTitle>
            <DialogDescription className="text-center">
              Select X or O to start playing!
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 justify-center py-4">
            <Button
              size="lg"
              className="btn-game-primary text-3xl h-20 w-20"
              onClick={() => handleSymbolSelect('X')}
            >
              X
            </Button>
            <Button
              size="lg"
              className="btn-game-primary text-3xl h-20 w-20"
              onClick={() => handleSymbolSelect('O')}
            >
              O
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* Left Column - Game Controls */}
        <div className="space-y-4 order-2 lg:order-1">
          {/* Game Mode Selection */}
          <Card className="card-game p-4 animate-scale-in">
            <h2 className="text-lg font-bold text-center mb-3 text-foreground">
              Game Mode
            </h2>
            <div className="flex flex-col gap-2">
              <Button
                variant={gameMode === 'computer' ? 'default' : 'outline'}
                className={gameMode === 'computer' ? 'btn-game-primary' : 'btn-game-secondary'}
                onClick={() => setGameMode('computer')}
              >
                🤖 Computer vs Human
              </Button>
              <Button
                variant={gameMode === 'human' ? 'default' : 'outline'}
                className={gameMode === 'human' ? 'btn-game-primary' : 'btn-game-secondary'}
                onClick={() => setGameMode('human')}
              >
                👥 Human vs Human
              </Button>
            </div>
          </Card>

          {/* Symbol Selection */}
          <Card className="card-game p-4 animate-scale-in">
            <h2 className="text-lg font-bold text-center mb-3 text-foreground">
              Your Symbol
            </h2>
            <div className="flex flex-col gap-2">
              <Button
                variant={humanPlayer === 'X' ? 'default' : 'outline'}
                className={humanPlayer === 'X' ? 'btn-game-primary' : 'btn-game-secondary'}
                onClick={() => setHumanPlayer('X')}
              >
                {gameMode === 'human' ? '⚔️ Player 1: X' : '✨ You: X'}
              </Button>
              <Button
                variant={humanPlayer === 'O' ? 'default' : 'outline'}
                className={humanPlayer === 'O' ? 'btn-game-primary' : 'btn-game-secondary'}
                onClick={() => setHumanPlayer('O')}
              >
                {gameMode === 'human' ? '🛡️ Player 1: O' : '🎮 You: O'}
              </Button>
            </div>
            {gameMode === 'computer' && (
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-3 px-2">
                <span>You: {humanPlayer}</span>
                <span>Computer: {aiPlayer}</span>
              </div>
            )}
          </Card>

          {/* Difficulty Selection (always visible, disabled when not in computer mode) */}
          <Card className="card-game p-4 animate-scale-in">
            <h2 className="text-lg font-bold text-center mb-3 text-foreground">
              Difficulty
            </h2>
            <div className="flex flex-col gap-2">
              <Button
                variant={difficulty === 'easy' ? 'default' : 'outline'}
                className={difficulty === 'easy' ? 'btn-game-primary' : 'btn-game-secondary'}
                onClick={() => setDifficulty('easy')}
                disabled={gameMode !== 'computer'}
                size="sm"
              >
                😊 Easy
              </Button>
              <Button
                variant={difficulty === 'medium' ? 'default' : 'outline'}
                className={difficulty === 'medium' ? 'btn-game-primary' : 'btn-game-secondary'}
                onClick={() => setDifficulty('medium')}
                disabled={gameMode !== 'computer'}
                size="sm"
              >
                🎯 Medium
              </Button>
              <Button
                variant={difficulty === 'hard' ? 'default' : 'outline'}
                className={difficulty === 'hard' ? 'btn-game-primary' : 'btn-game-secondary'}
                onClick={() => setDifficulty('hard')}
                disabled={gameMode !== 'computer'}
                size="sm"
              >
                🔥 Hard
              </Button>
            </div>
            {gameMode !== 'computer' && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                (Available in Computer mode)
              </p>
            )}
          </Card>
        </div>

        {/* Center Column - Game Board */}
        <div className="space-y-4 order-1 lg:order-2">
          {/* Status Card - Compact */}
          <Card className="card-game p-3 animate-fade-in">
            <div className="text-center">
              <p className="text-base font-semibold text-foreground">
                {statusMessage}
              </p>
            </div>
          </Card>

          {/* Game Grid - Traditional Tic-Tac-Toe Style */}
          <div className="relative mx-auto animate-scale-in" style={{ width: '280px', height: '280px' }}>
            {/* Vertical bars */}
            <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-primary/30" style={{ transform: 'translateX(-50%)' }}></div>
            <div className="absolute right-1/3 top-0 bottom-0 w-1 bg-primary/30" style={{ transform: 'translateX(50%)' }}></div>
            {/* Horizontal bars */}
            <div className="absolute left-0 right-0 top-1/3 h-1 bg-primary/30" style={{ transform: 'translateY(-50%)' }}></div>
            <div className="absolute left-0 right-0 bottom-1/3 h-1 bg-primary/30" style={{ transform: 'translateY(50%)' }}></div>

            {/* Cells */}
            <div className="grid grid-cols-3 gap-0 w-full h-full">
              {Array.from({ length: 9 }, (_, index) => {
                const isWinningCell = gameResult.type === 'win' && gameResult.line.includes(index);
                const cellValue = board[index];

                let cellClass = 'game-cell-bar';
                if (isWinningCell) cellClass = 'game-cell-bar game-cell-winning';

                return (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={
                      gameResult.type !== 'playing' ||
                      cellValue !== null ||
                      (gameMode === 'computer' && currentPlayer !== humanPlayer) ||
                      isThinking
                    }
                    className={cellClass}
                  >
                    {cellValue && (
                      <span
                        className={`
                          font-bold text-4xl animate-scale-in
                          ${cellValue === 'X' ? 'text-accent' : 'text-primary'}
                        `}
                      >
                        {cellValue}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Game Button */}
          <Card className="card-game p-3">
            <div className="flex flex-col gap-2">
              <Button
                onClick={startNewGame}
                variant="outline"
                className="btn-game-secondary w-full hover-scale"
              >
                🔄 New Round
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="btn-game-secondary w-full hover-scale text-xs"
                size="sm"
              >
                Reset All
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Game Stats & Tips */}
        <div className="space-y-4 order-3">
          <Card className="info-card p-4 animate-fade-in">
            <h3 className="text-sm font-semibold mb-2 text-primary flex items-center gap-2">
              🎯 Quick Tips
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Control the center square</li>
              <li>• Block opponent's winning moves</li>
              <li>• Create multiple threats (forks)</li>
              <li>• Think 2-3 moves ahead</li>
            </ul>
          </Card>

          <Card className="info-card p-4 animate-fade-in">
            <h3 className="text-sm font-semibold mb-2 text-accent flex items-center gap-2">
              🏆 Game Stats
            </h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Mode: {gameMode === 'computer' ? '🤖 vs AI' : '👥 vs Friend'}</p>
              {gameMode === 'computer' && (
                <p>Difficulty: {difficulty === 'easy' ? '😊 Easy' : difficulty === 'medium' ? '🎯 Medium' : '🔥 Hard'}</p>
              )}
              <p>Current: {currentPlayer}'s turn</p>
            </div>
          </Card>

          <Card className="info-card p-4 animate-fade-in">
            <h3 className="text-sm font-semibold mb-2 text-success flex items-center gap-2">
              💡 Did You Know?
            </h3>
            <p className="text-xs text-muted-foreground">
              On hard mode, the AI uses the minimax algorithm - it's mathematically perfect and unbeatable!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
