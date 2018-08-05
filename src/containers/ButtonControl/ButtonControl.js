import React from 'react';
import './ButtonControl.css';

const buttonControl = (props) => {
    return (
        <button 
            className={ props.classes }
            onClick={ props.clicked } 
            >{ props.label}
        </button>
    );
}

export default buttonControl;