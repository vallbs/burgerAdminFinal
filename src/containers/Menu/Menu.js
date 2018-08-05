import React from 'react';
import './Menu.css';

import { NavLink } from 'react-router-dom';

const menu = (props) => {
    return (
        <div className="Menu">
            <div className="MenuContainer">
                <NavLink 
                    className="MenuItem"
                    activeClassName="ActiveMenuItem"
                    to="/burgers">
                    Бургери
                </NavLink>
                <NavLink
                    className="MenuItem"
                    activeClassName="ActiveMenuItem"
                    to="/ingredients">
                    Інгредієнти
                </NavLink>
            </div>
        </div>
    );
}

export default menu;