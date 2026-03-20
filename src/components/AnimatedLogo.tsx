'use client';

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Pulse animation for play button */}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.8; }
          }
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(249, 129, 16, 0.4)); }
            50% { filter: drop-shadow(0 0 6px rgba(249, 129, 16, 0.8)); }
          }
          .play-button {
            animation: pulse 2s ease-in-out infinite;
            transform-origin: center;
          }
          .play-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Camera Body */}
      <g transform="translate(70, 5)">
        {/* Main body */}
        <rect x="8" y="12" width="44" height="35" rx="6" fill="#F98110" />
        
        {/* Film reels at top */}
        <circle cx="18" cy="12" r="8" fill="#F98110" />
        <circle cx="42" cy="12" r="8" fill="#F98110" />
        <circle cx="18" cy="12" r="5" fill="white" />
        <circle cx="42" cy="12" r="5" fill="white" />
        
        {/* Lens/Viewfinder on right */}
        <polygon points="52,22 65,18 65,38 52,34" fill="#F98110" />
        
        {/* Play button circle - with glow */}
        <g className="play-glow">
          <circle cx="30" cy="30" r="12" fill="white" />
        </g>
        
        {/* Play triangle - animated */}
        <g className="play-button">
          <polygon points="26,24 26,36 37,30" fill="#F98110" />
        </g>
        
        {/* Tripod legs */}
        <line x1="22" y1="47" x2="10" y2="58" stroke="#F98110" strokeWidth="5" strokeLinecap="round" />
        <line x1="38" y1="47" x2="50" y2="58" stroke="#F98110" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Text: DUBBINGRIGHTS */}
      <g transform="translate(100, 82)">
        {/* DUBBING - outline only */}
        <text 
          x="0" 
          y="0" 
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill="none"
          stroke="#F98110"
          strokeWidth="1.2"
          letterSpacing="1"
        >
          DUBBING
        </text>
        {/* RIGHTS - filled */}
        <text 
          x="52" 
          y="0" 
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill="#F98110"
          letterSpacing="1"
        >
          RIGHTS
        </text>
      </g>
    </svg>
  );
}
