import React from 'react';

const inputControl = (props) => {
    return (
        <div>
            <label>{ props.label }: </label>
            <input
                onChange={ props.valueChanged }
                type={ props.type }
                name={ props.name}
                value={ props.value} />
        </div>
    );
}

export default inputControl;