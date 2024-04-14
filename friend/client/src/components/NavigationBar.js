import React from 'react';
import './NavigationBar.css';

// NavigationBar.js

// This is a functional component called NavigationBar
const NavigationBar = () => {
    return (
        <div className="navbar">
            <button className="nav-button">Login</button>
            <button className="nav-button">Sign Up</button>
        </div>
    );
};

// Export the NavigationBar component as the default export
export default NavigationBar;
