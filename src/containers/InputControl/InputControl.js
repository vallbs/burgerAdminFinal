import React from 'react';
import './InputControl.css';

const inputControl = (props) => {
    return (
        <div className="InputControl">
            <label className="InputLabel">{ props.label }: </label>
            <input
                className="Input"
                onChange={ props.valueChanged }
                type={ props.type }
                name={ props.name}
                value={ props.value} />
        </div>
    );
}

export default inputControl;