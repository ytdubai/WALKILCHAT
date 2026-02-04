import { ReactNode } from 'react';
import { ParticlesBackground } from '../ui/ParticlesBackground';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated background */}
      <ParticlesBackground />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none" />
      
      {/* Cyber grid */}
      <div className="fixed inset-0 cyber-grid pointer-events-none" />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}