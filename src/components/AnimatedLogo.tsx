'use client';

import { useState, useEffect } from 'react';

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(true);

  // Toggle between play and pause every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg 
      viewBox="0 0 240 90" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          .play-pause-transition {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .glow {
            filter: drop-shadow(0 0 3px rgba(249, 129, 16, 0.5));
          }
        `}</style>
      </defs>

      {/* Camera Body */}
      <g transform="translate(95, 2)">
        {/* Main body */}
        <rect x="8" y="12" width="44" height="35" rx="6" fill="#F98110" />
        
        {/* Film reels at top */}
        <circle cx="18" cy="12" r="8" fill="#F98110" />
        <circle cx="42" cy="12" r="8" fill="#F98110" />
        <circle cx="18" cy="12" r="5" fill="white" />
        <circle cx="42" cy="12" r="5" fill="white" />
        
        {/* Lens/Viewfinder on right */}
        <polygon points="52,22 65,18 65,38 52,34" fill="#F98110" />
        
        {/* Play button circle */}
        <g className="glow">
          <circle cx="30" cy="30" r="12" fill="white" />
        </g>
        
        {/* Play/Pause icon - animated toggle */}
        <g className="play-pause-transition">
          {isPlaying ? (
            /* Play triangle */
            <polygon 
              points="26,24 26,36 37,30" 
              fill="#F98110"
              className="play-pause-transition"
            />
          ) : (
            /* Pause bars */
            <g fill="#F98110" className="play-pause-transition">
              <rect x="24" y="24" width="4" height="12" rx="1" />
              <rect x="32" y="24" width="4" height="12" rx="1" />
            </g>
          )}
        </g>
        
        {/* Tripod legs */}
        <line x1="22" y1="47" x2="10" y2="58" stroke="#F98110" strokeWidth="5" strokeLinecap="round" />
        <line x1="38" y1="47" x2="50" y2="58" stroke="#F98110" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Text: DUBBING RIGHTS - properly spaced */}
      <g transform="translate(120, 78)">
        {/* DUBBING - outline only */}
        <text 
          x="-55" 
          y="0" 
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="none"
          stroke="#F98110"
          strokeWidth="1"
          letterSpacing="0.5"
        >
          DUBBING
        </text>
        {/* RIGHTS - filled */}
        <text 
          x="8" 
          y="0" 
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#F98110"
          letterSpacing="0.5"
        >
          RIGHTS
        </text>
      </g>
    </svg>
  );
}
