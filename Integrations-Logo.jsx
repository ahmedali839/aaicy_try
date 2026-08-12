import React from 'react';

const IntegrationsLogo = () => {
  const logoData = [
    {
      name: "Facebook",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          {/* Vector from Figma description */}
          <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="#1877F2"/>
          <path d="M22.782 19.278C22.782 19.278 22.782 19.278 22.782 19.278C22.782 19.278 22.782 19.278 22.782 19.278V39.33H29.172V30.93H32.658C32.658 30.93 32.658 30.93 32.658 30.93L33.258 26.694H29.172V23.7C29.172 22.68 29.418 22.182 30.558 22.182H33.258V18.156C33.258 18.156 33.258 18.156 32.658 18.156C32.658 18.156 31.578 18.066 30.438 18.066C28.188 18.066 26.796 19.458 26.796 21.99V26.694H22.782V19.278Z" fill="#FFFFFF"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          {/* Main Instagram gradient background */}
          <rect x="13.2" y="13.2" width="33.6" height="33.6" fill="black"/> {/* This will be masked by gradients */}
          <g clipPath="url(#instagram-clip)">
            {/* These gradients are tricky to represent purely with 'fill' on path, usually they require actual gradient definitions */}
            {/* For simplicity, I'll use a solid color if direct gradient conversion is not straightforward in SVG paths without defs */}
            <rect x="13.2" y="13.2" width="33.6" height="33.6" fill="url(#instagram-gradient-1)"/>
            <rect x="13.2" y="13.2" width="33.6" height="33.6" fill="url(#instagram-gradient-2)"/>
            <rect x="13.2" y="13.2" width="33.6" height="33.6" fill="url(#instagram-gradient-3)"/>
            <rect x="13.2" y="13.2" width="33.6" height="33.6" fill="url(#instagram-gradient-4)"/>
          </g>
          {/* Inner white rectangle */}
          <rect x="17.514" y="17.514" width="24.498" height="24.498" fill="#FFFFFF"/>
          <defs>
            <radialGradient id="instagram-gradient-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(46.0621 28.1221) rotate(162.77) scale(22.8441 31.7801)">
              <stop stopColor="#FF005F"/>
              <stop offset="1" stopColor="#FC01D8"/>
            </radialGradient>
            <radialGradient id="instagram-gradient-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9575 64.65) rotate(-37.38) scale(60.187 63.5042)">
              <stop stopColor="#FFCC00"/>
              <stop offset="0.124" stopColor="#FFCC00"/>
              <stop offset="0.567" stopColor="#FE4A05"/>
              <stop offset="0.694" stopColor="#FF0F3F"/>
              <stop offset="1" stopColor="rgba(254, 6, 87, 0)"/>
            </radialGradient>
             <radialGradient id="instagram-gradient-3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(31.518 59.388) rotate(-75.9893) scale(18.3364 23.9553)">
              <stop stopColor="#FFCC00"/>
              <stop offset="1" stopColor="rgba(255, 204, 0, 0)"/>
            </radialGradient>
            <radialGradient id="instagram-gradient-4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.164 2.442) rotate(138.83) scale(26.6876 25.1325)">
              <stop stopColor="#780CFF"/>
              <stop offset="1" stopColor="rgba(130, 11, 255, 0)"/>
            </radialGradient>
            <clipPath id="instagram-clip">
              <rect x="13.2" y="13.2" width="33.6" height="33.6"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Google",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#google-clip)">
            <path d="M22.27 24.93H37.6V42.07H22.27V24.93Z" fill="#000000"/>
            <path d="M22.27 24.93H37.6V42.07H22.27V24.93Z" fill="#000000"/>
            {/* These are placeholder paths, actual Google logo is more complex */}
            <path d="M30 45.02C30 45.02 30 45.02 30 45.02L36.99 31.43V45.02H30Z" fill="#4285F4"/>
            <path d="M14.93 37.51C14.93 37.51 14.93 37.51 14.93 37.51L28.5 55.47H14.93V37.51Z" fill="#34A853"/>
            <path d="M21.89 37.51C21.89 37.51 21.89 37.51 21.89 37.51L34.27 22.02H21.89V37.51Z" fill="#FBBC05"/>
            <path d="M24.88 22.02C24.88 22.02 24.88 22.02 24.88 22.02L38.45 45.02H24.88V22.02Z" fill="#EA4335"/>
          </g>
          <defs>
            <clipPath id="google-clip">
              <rect x="13.362" y="14.958" width="33.864" height="30.138"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];
    {
      name: "LinkedIn",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <path d="M13.362 13.362H46.638V46.638H13.362V13.362Z" fill="#0A66C2"/>
          <rect x="23.362" y="23.362" width="4" height="13" fill="#FFFFFF"/>
          <circle cx="25.362" cy="20.362" r="2.5" fill="#FFFFFF"/>
          <path d="M30 23.362H34V25.362C34 25.362 34 25.362 34 25.362C34 25.362 34 25.362 34 25.362V23.362H36.362V29.362C36.362 29.362 36.362 29.362 36.362 29.362C36.362 29.362 36.362 29.362 36.362 29.362L36.362 23.362H38.362V33.362H34.362V30.362C34.362 30.362 34.362 30.362 34.362 30.362C34.362 30.362 34.362 30.362 34.362 30.362L34.362 33.362H30.362V25.362C30.362 25.362 30.362 25.362 30.362 25.362L30.362 33.362H26.362V23.362H30Z" fill="#FFFFFF"/>
        </svg>
      ),
    },
    {
      name: "TikTok",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#tiktok-clip)">
            <path d="M14.8 24.984C14.8 24.984 14.8 24.984 14.8 24.984C14.8 24.984 14.8 24.984 14.8 24.984L14.8 33.24V38.112C14.8 38.112 14.8 38.112 14.8 38.112C14.8 38.112 14.8 38.112 14.8 38.112C14.8 38.112 14.8 38.112 14.8 38.112H20.088V30.408C20.088 30.408 20.088 30.408 20.088 30.408C20.088 30.408 20.088 30.408 20.088 30.408C20.088 30.408 20.088 30.408 20.088 30.408L24.384 30.408V24.984H14.8Z" fill="#25F4EE"/>
            <path d="M22.98 20.04C22.98 20.04 22.98 20.04 22.98 20.04C22.98 20.04 22.98 20.04 22.98 20.04L22.98 25.32H27.996V30.408C27.996 30.408 27.996 30.408 27.996 30.408C27.996 30.408 27.996 30.408 27.996 30.408C27.996 30.408 27.996 30.408 27.996 30.408L32.748 30.408C32.748 30.408 32.748 30.408 32.748 30.408L32.748 24.984H22.98Z" fill="#25F4EE"/>
            <path d="M20.466 22.77C20.466 22.77 20.466 22.77 20.466 22.77C20.466 22.77 20.466 22.77 20.466 22.77C20.466 22.77 20.466 22.77 20.466 22.77L25.32 22.77V28.056H20.466Z" fill="#FE2C55"/>
            <path d="M19.26 31.062C19.26 31.062 19.26 31.062 19.26 31.062C19.26 31.062 19.26 31.062 19.26 31.062C19.26 31.062 19.26 31.062 19.26 31.062L24.966 31.062V36.348H19.26Z" fill="#FE2C55"/>
            <path d="M16.458 36.714C16.458 36.714 16.458 36.714 16.458 36.714C16.458 36.714 16.458 36.714 16.458 36.714C16.458 36.714 16.458 36.714 16.458 36.714L22.164 36.714V42.006H16.458Z" fill="#000000"/>
          </g>
          <defs>
            <clipPath id="tiktok-clip">
              <rect x="14.8" y="12.87" width="30.53" height="34.13"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Discord",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="#5865F2"/>
          {/* Discord logo path (simplified) */}
          <path d="M24.77 27.2H35.23L34.19 31.33C34.19 31.33 34.19 31.33 34.19 31.33L35.23 35.47C35.23 35.47 35.23 35.47 35.23 35.47L24.77 35.47L25.81 31.33C25.81 31.33 25.81 31.33 25.81 31.33L24.77 27.2ZM27.27 28.53C27.27 28.53 27.27 28.53 27.27 28.53L27.7 27.53C27.7 27.53 27.7 27.53 27.7 27.53L28.87 27.53C28.87 27.53 28.87 27.53 28.87 27.53L29.3 28.53C29.3 28.53 29.3 28.53 29.3 28.53L27.27 28.53Z" fill="white"/>
          <circle cx="28.5" cy="30" r="1.5" fill="white"/>
        </svg>
      ),
    },
    {
      name: "Pinterest",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#pinterest-clip)">
            <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="#E60023"/>
          </g>
          <path d="M29.98 20.67C29.98 20.67 29.98 20.67 29.98 20.67L29.98 39.33L25.75 39.33L25.75 30.67C25.75 30.67 25.75 30.67 25.75 30.67L25.75 25.75L21.43 25.75L21.43 30.67C21.43 30.67 21.43 30.67 21.43 30.67L21.43 39.33H17.2C17.2 39.33 17.2 39.33 17.2 39.33L17.2 20.67C17.2 20.67 17.2 20.67 17.2 20.67L29.98 20.67ZM34.2 20.67C34.2 20.67 34.2 20.67 34.2 20.67L34.2 39.33H30V30.67C30 30.67 30 30.67 30 30.67L30 25.75L34.2 25.75V30.67C34.2 30.67 34.2 30.67 34.2 30.67L34.2 39.33H38.4L38.4 20.67H34.2Z" fill="#FFFFFF"/>
          <defs>
            <clipPath id="pinterest-clip">
              <rect x="12.4" y="12.4" width="35.2" height="35.2"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "YouTube",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#youtube-clip)">
            <path d="M12.4 17.6H47.6V42.4H12.4V17.6Z" fill="#ED1D24"/>
            <path d="M26.4 26.72C26.4 26.72 26.4 26.72 26.4 26.72L33.6 30C33.6 30 33.6 30 33.6 30L26.4 33.28V26.72Z" fill="#FFFFFF"/>
          </g>
          <defs>
            <clipPath id="youtube-clip">
              <rect x="12.4" y="17.6" width="35.2" height="24.8"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Google Ads",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <path d="M30 45.02C30 45.02 30 45.02 30 45.02L36.99 31.43V45.02H30Z" fill="#4285F4"/>
          <path d="M14.93 37.51C14.93 37.51 14.93 37.51 14.93 37.51L28.5 55.47H14.93V37.51Z" fill="#34A853"/>
          <path d="M21.89 37.51C21.89 37.51 21.89 37.51 21.89 37.51L34.27 22.02H21.89V37.51Z" fill="#FBBC05"/>
          <path d="M24.88 22.02C24.88 22.02 24.88 22.02 24.88 22.02L38.45 45.02H24.88V22.02Z" fill="#EA4335"/>
          <path d="M24.88 22.02L31.4 55.47H45.07L38.45 22.02H24.88Z" fill="#FFFFFF"/>
        </svg>
      ),
    },
    {
      name: "Unknown 1",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#unknown1-clip)">
            <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="#7D2AE7"/>
            <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="url(#unknown1-gradient-1)"/>
            <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="url(#unknown1-gradient-2)"/>
            <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="url(#unknown1-gradient-3)"/>
            <path d="M12.4 12.4H47.6V47.6H12.4V12.4Z" fill="url(#unknown1-gradient-4)"/>
            <path d="M20.766 30.915L20.766 29.805L29.61 29.805L29.61 30.915L20.766 30.915Z" fill="#FFFFFF"/>
          </g>
          <defs>
            <radialGradient id="unknown1-gradient-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.32 88.63) rotate(-139.69) scale(40.6401 39.4201)">
              <stop stopColor="#6420FF"/>
              <stop offset="1" stopColor="rgba(100, 32, 255, 0)"/>
            </radialGradient>
            <radialGradient id="unknown1-gradient-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26.47 11.37) rotate(138.8) scale(49.2638 48.0163)">
              <stop stopColor="#00C4CC"/>
              <stop offset="1" stopColor="rgba(0, 196, 204, 0)"/>
            </radialGradient>
            <radialGradient id="unknown1-gradient-3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.32 88.63) rotate(-139.69) scale(36.96 36.68)">
              <stop stopColor="#6420FF"/>
              <stop offset="1" stopColor="rgba(100, 32, 255, 0)"/>
            </radialGradient>
            <radialGradient id="unknown1-gradient-4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40.89 13.47) rotate(138.8) scale(72.5856 50.8876)">
              <stop stopColor="#00C4CC"/>
              <stop offset="1" stopColor="rgba(0, 196, 204, 0)"/>
            </radialGradient>
            <clipPath id="unknown1-clip">
              <rect x="12.4" y="12.4" width="35.2" height="35.2"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Unknown 2",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#unknown2-clip)">
            <path d="M13.2 13.68H46.8V44.47H13.2V13.68Z" fill="#000B1D"/>
            <path d="M21.246 20.688H38.754V38.196H21.246V20.688Z" fill="#FFFFFF"/>
          </g>
          <defs>
            <clipPath id="unknown2-clip">
              <rect x="13.2" y="13.68" width="33.6" height="30.79"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Unknown 3",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#unknown3-clip)">
            <path d="M13.2 13.2H46.8V46.8H13.2V13.2Z" fill="#000000"/>
          </g>
          <defs>
            <clipPath id="unknown3-clip">
              <rect x="13.2" y="13.2" width="33.6" height="33.6"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Unknown 4",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <g clipPath="url(#unknown4-clip)">
            <path d="M13.2 13.2H46.8V46.8H13.2V13.2Z" fill="#05A081"/>
            <path d="M24.75 22.65H35.25V37.25H24.75V22.65Z" fill="#FFFFFF"/>
          </g>
          <defs>
            <clipPath id="unknown4-clip">
              <rect x="13.2" y="13.2" width="33.6" height="33.6"/>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Unknown 5",
      svg: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" fill="#FCFBF6"/>
          <path d="M11.2 15.84C11.2 15.84 11.2 15.84 11.2 15.84L28.98 15.84V33.62L11.2 33.62V15.84Z" fill="#43A047"/>
          <path d="M28.52 15.84C28.52 15.84 28.52 15.84 28.52 15.84L46.3 15.84V33.62L28.52 33.62V15.84Z" fill="#43A047"/>
        </svg>
      ),
    },

  const LogoCircle = ({ svg }) => (
    <div style={logoContainerStyle}>
      <div style={logoDefaultStyle}>
        <div style={overlayShadowStyle}>
          {svg}
        </div>
        <div style={linkLayerStyle}></div>
        <div style={logoBorderStyle}></div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Content will be added here */}
    </div>
  );

};

export default IntegrationsLogo;