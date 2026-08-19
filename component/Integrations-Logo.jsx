import React from 'react';
import './Integrations-Logo.css'; // We will create this CSS file

const IntegrationsLogo = () => {
  const icons = [
    { id: 1, src: 'https://img.icons8.com/color/48/000000/facebook-new.png', alt: 'Facebook' },
    { id: 2, src: 'https://img.icons8.com/color/48/000000/instagram-new--v1.png', alt: 'Instagram' },
    { id: 3, src: 'https://img.icons8.com/color/48/000000/twitter--v1.png', alt: 'Twitter' },
    { id: 4, src: 'https://img.icons8.com/color/48/000000/youtube--v1.png', alt: 'YouTube' },
    { id: 5, src: 'https://img.icons8.com/color/48/000000/pinterest--v1.png', alt: 'Pinterest' },
    { id: 6, src: 'https://img.icons8.com/color/48/000000/google.png', alt: 'Google' },
    { id: 7, src: 'https://img.icons8.com/color/48/000000/discord--v1.png', alt: 'Discord' },
    { id: 8, src: 'https://img.icons8.com/color/48/000000/telegram-app.png', alt: 'Telegram' },
    { id: 9, src: 'https://img.icons8.com/color/48/000000/slack--v1.png', alt: 'Slack' },
    { id: 10, src: 'https://img.icons8.com/color/48/000000/shopify.png', alt: 'Shopify' },
    { id: 11, src: 'https://img.icons8.com/color/48/000000/dropbox.png', alt: 'Dropbox' },
    { id: 12, src: 'https://img.icons8.com/color/48/000000/microsoft-onedrive-2019.png', alt: 'OneDrive' },
    // Duplicate icons to ensure a smooth infinite scroll effect
    { id: 13, src: 'https://img.icons8.com/color/48/000000/facebook-new.png', alt: 'Facebook' },
    { id: 14, src: 'https://img.icons8.com/color/48/000000/instagram-new--v1.png', alt: 'Instagram' },
    { id: 15, src: 'https://img.icons8.com/color/48/000000/twitter--v1.png', alt: 'Twitter' },
    { id: 16, src: 'https://img.icons8.com/color/48/000000/youtube--v1.png', alt: 'YouTube' },
    { id: 17, src: 'https://img.icons8.com/color/48/000000/pinterest--v1.png', alt: 'Pinterest' },
    { id: 18, src: 'https://img.icons8.com/color/48/000000/google.png', alt: 'Google' },
    { id: 19, src: 'https://img.icons8.com/color/48/000000/discord--v1.png', alt: 'Discord' },
    { id: 20, src: 'https://img.icons8.com/color/48/000000/telegram-app.png', alt: 'Telegram' },
    { id: 21, src: 'https://img.icons8.com/color/48/000000/slack--v1.png', alt: 'Slack' },
    { id: 22, src: 'https://img.icons8.com/color/48/000000/shopify.png', alt: 'Shopify' },
    { id: 23, src: 'https://img.icons8.com/color/48/000000/dropbox.png', alt: 'Dropbox' },
    { id: 24, src: 'https://img.icons8.com/color/48/000000/microsoft-onedrive-2019.png', alt: 'OneDrive' },
  ];

  return (
    <div className="integrations-logo-container">
      <div className="integrations-logo-inner">
        {icons.map(icon => (
          <div key={icon.id} className="integration-icon-wrapper">
            <img src={icon.src} alt={icon.alt} className="integration-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

// // 

export default IntegrationsLogo;