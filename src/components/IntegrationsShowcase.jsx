import React from 'react';
import classes from '../styles/IntegrationsShowcase.module.css';

const integrations = [
  { src: '/Hero/Integrations1.svg', alt: 'Integration 1' },
  { src: '/Hero/Integrations2.svg', alt: 'Integration 2' },
  { src: '/Hero/Integrations3.svg', alt: 'Integration 3' }, 
  // i have added comment only
  // Add more integration images as needed
  Add more integration images as needed
];

export const IntegrationsShowcase = () => {
  return (
    <section className={classes.integrationsSection}>
      <div className={classes.integrationsHeader}>
        <div className={classes.badgeWrapper}>
          <div className={classes.badge}>
            <span className={classes.badgeLabel}>Integrations</span>
          </div>
        </div>
        <h2 className={classes.heading}>Integrations supported.</h2>
        <p className={classes.description}>
          From social media platforms to ecommerce and design software, our
          <br />
          integrations make it easy to keep everything connected.
        </p>
      </div>
      <div className={classes.integrationsContainer}>
        <div className={classes.integrationsTrack}>
          {[...integrations, ...integrations, ...integrations].map((integration, index) => (
            <div key={index} className={classes.integrationCard}>
              <img src={integration.src} alt={integration.alt} className={classes.integrationImage} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
