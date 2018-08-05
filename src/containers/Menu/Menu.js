import React from 'react';
import './Menu.css';

import { NavLink } from 'react-router-dom';

const menu = (props) => {
    return (
        <div className="Menu">
            {/* <i className="fas fa-bars"></i> */}
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

                {/* <ul className="MenuContainer">
                    <li className="MenuItem Active"><a href="/burgers">Бургери</a></li>
                    <li className="MenuItem"><a href="/ingredients">Інгредієнти</a></li>
                </ul> */}
            </div>
        </div>
    );
}

export default menu;