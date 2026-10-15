import React from 'react';

// Hand-drawn SVG doodles inspired by the reference website design

export function DoodleeSpiral({ color = '#FFFFFF', size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`doodle-svg ${className}`}>
      <path
        d="M32 32C32 26.4772 27.5228 22 22 22C16.4772 22 12 26.4772 12 32C12 43.0457 20.9543 52 32 52C46.3594 52 58 40.3594 58 26C58 8.87917 44.1208 -5 27 -5"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleSquiggle({ color = '#FFFFFF', width = 90, height = 30, className = '' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 30" fill="none" className={`doodle-svg ${className}`}>
      <path
        d="M4 18C16 4 28 26 40 14C52 2 64 24 76 12C84 4 92 10 96 16"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleStar({ color = '#FBBF24', size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={`doodle-svg ${className}`}>
      <path
        d="M20 2L24 15L37 15L27 23L31 36L20 28L9 36L13 23L3 15L16 15L20 2Z"
        fill={color}
      />
    </svg>
  );
}

export function DoodleSparkle({ color = '#FFFFFF', size = 28, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`doodle-svg ${className}`}>
      <path
        d="M16 2V30M2 16H30M6 6L26 26M6 26L26 6"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ color = '#1E1B4B', width = 50, height = 35, className = '' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 60 40" fill="none" className={`doodle-svg ${className}`}>
      <path
        d="M6 34C18 12 36 8 52 18M52 18L44 8M52 18L44 26"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleDots({ color = '#CBD5E1', count = 12, className = '' }) {
  return (
    <div className={`doodle-dots ${className}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 8px)', gap: '10px' }}>
      {[...Array(count)].map((_, i) => (
        <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'block' }} />
      ))}
    </div>
  );
}
