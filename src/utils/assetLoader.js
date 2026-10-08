// Image asset loader with automatic placeholder generation for missing photos
export const createPlaceholderSVG = (title = 'Our Special Memory', caption = 'Photo goes here ✨') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2D122D"/>
          <stop offset="50%" stop-color="#4A1E35"/>
          <stop offset="100%" stop-color="#1A0B1A"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#cardGrad)" rx="16" />
      <g filter="url(#glow)">
        <path d="M 300 160 C 300 130 260 110 240 140 C 220 110 180 130 180 160 C 180 200 240 230 300 270 C 360 230 420 200 420 160 C 420 130 380 110 360 140 C 340 110 300 130 300 160 Z" fill="#FF85A1" opacity="0.6"/>
      </g>
      <text x="300" y="220" font-family="'Playfair Display', serif" font-size="24" font-weight="bold" fill="#FFF0F5" text-anchor="middle">
        ${title}
      </text>
      <text x="300" y="255" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#FFD166" text-anchor="middle" opacity="0.9">
        ${caption}
      </text>
      <text x="300" y="340" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#FFF0F5" opacity="0.5" text-anchor="middle">
        Place photo in /public/assets/photos/
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const handleImageError = (e, title, caption) => {
  console.warn(`Image failed to load: ${e.target.src}. Using aesthetic placeholder.`);
  e.target.onerror = null; // Prevent infinite loop
  e.target.src = createPlaceholderSVG(title, caption);
};
