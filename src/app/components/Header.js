import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <div className="usrhome-hdr">
        <NavLink
            to="/"
            exact={true}>Home</NavLink>
        <NavLink
            to="/forecast"
            exact={true}>Forecast</NavLink>
    </div>
);

export default Header;
