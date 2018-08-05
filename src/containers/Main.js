import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
    render() {
        return (
            <div>
                <div>
                    <a href="/burgers">бургери</a>
                </div>
                <div>
                    <a href="/ingredients">інгредієнти</a>
                </div>
            </div>
        );
    };
}

export default Main;

