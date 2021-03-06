import React from 'react';

import './InputButton.css';

const inputButton = props => {
    return (
        <button className={props.className} onClick={props.onButtonClick}>
            {props.children}
        </button>
    );
};

export default inputButton;
