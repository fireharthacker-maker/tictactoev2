'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, Gamepad2 } from 'lucide-react';

interface FooterLink {
	title: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Game',
		links: [
			{ title: 'Play Now' },
			{ title: 'How to Play' },
			{ title: 'Strategies' },
			{ title: 'Game Modes' },
		],
	},
	{
		label: 'About',
		links: [
			{ title: 'About Us' },
			{ title: 'Contact' },
			{ title: 'Privacy Policy' },
			{ title: 'Terms of Service' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Game Tips' },
			{ title: 'AI Algorithm' },
			{ title: 'FAQ' },
			{ title: 'Support' },
		],
	},
	{
		label: 'Follow Us',
		links: [
			{ title: 'Facebook', icon: FacebookIcon },
			{ title: 'Twitter', icon: TwitterIcon },
			{ title: 'Instagram', icon: InstagramIcon },
			{ title: 'YouTube', icon: YoutubeIcon },
			{ title: 'LinkedIn', icon: LinkedinIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<div className="flex items-center gap-2">
						<Gamepad2 className="size-8 text-primary" />
						<span className="text-xl font-bold text-foreground">Tic-Tac-Go</span>
					</div>
					<p className="text-muted-foreground text-sm max-w-xs">
						Challenge yourself with our unbeatable AI or play with friends. The ultimate tic-tac-toe experience with perfect minimax algorithm.
					</p>
					<p className="text-muted-foreground mt-8 text-sm md:mt-4">
						© {new Date().getFullYear()} Tic-Tac-Go. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<span
												className="hover:text-foreground inline-flex items-center transition-all duration-300 hover:translate-x-0.5 cursor-pointer"
											>
												{link.icon && <link.icon className="me-1.5 size-4" />}
												{link.title}
											</span>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
