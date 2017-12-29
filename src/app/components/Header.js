import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <div className="app-hdr">
        <ul>
            <li>
                <NavLink
                    to="/"
                    activeClassName="is-active"
                    exact={true}>Home</NavLink>
            </li>
            <li>
                <NavLink
                    to="/forecast"
                    activeClassName="is-active"
                    exact={true}>Forecast</NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    activeClassName="is-active"
                    exact={true}>About</NavLink>
            </li>
        </ul>
    </div>
);

export default Header;
