import React from 'react';
import './IntegrationsLogo.css';

const integrations = [
    'icon1.png',
    'icon2.png',
    'icon3.png',
    'icon4.png',
    'icon5.png',
    // Add more icons here
];

const IntegrationsLogo = () => {
    return (
        <div className='integrations-container'>
            <div className='scrolling-icons'>
                {integrations.map((icon, index) => (
                    <div className='icon-wrapper' key={index}>
                        <img src={require(`./icons/${icon}`)} alt='integration icon' className='integration-icon'/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntegrationsLogo;