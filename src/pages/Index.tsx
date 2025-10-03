import TicTacToe from '@/components/TicTacToe';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Top Ad Banner - AdSense Leaderboard (728x90) or Large Mobile Banner (320x100) */}
      <div className="w-full bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto min-h-[90px] md:min-h-[90px] flex items-center justify-center py-2">
          {/* AdSense Ad Unit - Replace with your ad code */}
          <div id="ad-top-banner" className="w-full max-w-[728px] min-h-[90px] flex items-center justify-center">
            <div className="text-muted-foreground text-xs">Advertisement</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Ad Sidebar - Wide Skyscraper (160x600) or Wide Skyscraper (120x600) */}
        <aside className="hidden lg:block w-48 xl:w-64 bg-muted/20 border-r border-border min-h-screen sticky top-0">
          <div className="p-3 h-full flex flex-col items-center pt-8 gap-6">
            {/* AdSense Ad Unit 1 */}
            <div id="ad-left-sidebar-1" className="w-full max-w-[160px] min-h-[600px] flex items-center justify-center bg-muted/10 rounded">
              <div className="text-muted-foreground text-xs text-center">Ad Space</div>
            </div>
            {/* Additional sidebar ad space */}
            <div id="ad-left-sidebar-2" className="w-full max-w-[160px] min-h-[250px] flex items-center justify-center bg-muted/10 rounded">
              <div className="text-muted-foreground text-xs text-center">Ad Space</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-6 px-4">
          {/* Hero Section - Compact */}
          <div className="max-w-5xl mx-auto text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              Tic-Tac-Toe
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
              Play against the computer or with a friend! Choose your difficulty and enjoy this timeless strategy game.
            </p>
          </div>

          {/* Game Component - At the Top */}
          <div className="max-w-5xl mx-auto">
            <TicTacToe />
          </div>

          {/* In-Content Ad - Rectangle (300x250) or Large Rectangle (336x280) */}
          <div className="max-w-5xl mx-auto mt-6 flex justify-center">
            <div id="ad-in-content-1" className="w-full max-w-[336px] min-h-[280px] bg-muted/20 rounded-lg flex items-center justify-center border border-border/30">
              <div className="text-muted-foreground text-xs">Advertisement</div>
            </div>
          </div>

          {/* Info Section - How to Play */}
          <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-4">
            <Card className="info-card p-5">
              <h2 className="text-xl font-bold mb-3 text-primary">🎮 How to Play</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Objective:</strong> Get three of your symbols in a row (horizontally, vertically, or diagonally).</p>
                <p><strong className="text-foreground">Gameplay:</strong> Players take turns placing X or O on the 3x3 grid.</p>
                <p><strong className="text-foreground">Win Condition:</strong> First player to align three symbols wins!</p>
                <p><strong className="text-foreground">Draw:</strong> If all 9 squares are filled with no winner, it's a draw.</p>
              </div>
            </Card>

            <Card className="info-card p-5">
              <h2 className="text-xl font-bold mb-3 text-accent">🤖 About the AI</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Easy Mode:</strong> Makes random moves - perfect for beginners!</p>
                <p><strong className="text-foreground">Medium Mode:</strong> Mixes smart plays with occasional mistakes.</p>
                <p><strong className="text-foreground">Hard Mode:</strong> Uses minimax algorithm - plays perfectly every time. The best you can hope for is a draw!</p>
                <p className="text-xs italic mt-2">Fun fact: Tic-tac-toe is a "solved game" - with perfect play from both sides, it always ends in a draw.</p>
              </div>
            </Card>
          </div>

          {/* Strategy Tips */}
          <div className="max-w-5xl mx-auto mt-4">
            <Card className="info-card p-5">
              <h2 className="text-xl font-bold mb-3 text-success">🎯 Winning Strategies</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <h3 className="text-foreground font-semibold mb-2">⭐ Basic Strategy</h3>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Start in the center if possible</li>
                    <li>Take corners when available</li>
                    <li>Always block opponent's winning moves</li>
                    <li>Create two-way win opportunities (forks)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-2">🔥 Advanced Tactics</h3>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Force your opponent into bad positions</li>
                    <li>Look for "fork" opportunities (two ways to win)</li>
                    <li>If opponent takes center, take a corner</li>
                    <li>Plan 2-3 moves ahead</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* In-Content Ad 2 - Another Rectangle */}
          <div className="max-w-5xl mx-auto mt-6 flex justify-center">
            <div id="ad-in-content-2" className="w-full max-w-[336px] min-h-[280px] bg-muted/20 rounded-lg flex items-center justify-center border border-border/30">
              <div className="text-muted-foreground text-xs">Advertisement</div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="max-w-5xl mx-auto mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Tic-Tac-Toe (also known as Noughts and Crosses or Xs and Os) is a classic game that has been enjoyed for centuries.
              This digital version features an unbeatable AI opponent and a clean, modern interface.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              <a href="/privacy-policy" className="hover:text-primary underline">Privacy Policy</a>
            </p>
          </div>

          {/* Bottom Ad Banner - Another Leaderboard */}
          <div className="max-w-5xl mx-auto mt-6 mb-6 flex justify-center">
            <div id="ad-bottom-banner" className="w-full max-w-[728px] min-h-[90px] bg-muted/20 rounded-lg flex items-center justify-center border border-border/30">
              <div className="text-muted-foreground text-xs">Advertisement</div>
            </div>
          </div>
        </main>

        {/* Right Ad Sidebar - Wide Skyscraper (160x600) or Wide Skyscraper (120x600) */}
        <aside className="hidden lg:block w-48 xl:w-64 bg-muted/20 border-l border-border min-h-screen sticky top-0">
          <div className="p-3 h-full flex flex-col items-center pt-8 gap-6">
            {/* AdSense Ad Unit 1 */}
            <div id="ad-right-sidebar-1" className="w-full max-w-[160px] min-h-[600px] flex items-center justify-center bg-muted/10 rounded">
              <div className="text-muted-foreground text-xs text-center">Ad Space</div>
            </div>
            {/* Additional sidebar ad space */}
            <div id="ad-right-sidebar-2" className="w-full max-w-[160px] min-h-[250px] flex items-center justify-center bg-muted/10 rounded">
              <div className="text-muted-foreground text-xs text-center">Ad Space</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
