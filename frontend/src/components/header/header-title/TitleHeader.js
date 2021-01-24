import React from 'react';
import './titleheader.css';

const TitleHeader = (props) => {
    return (
        <div className="titleHeader">
            <div className="titleHeader-title">
                <span>{props.title}</span>
            </div>
            <div className="titleHeader-description">
                <span>{props.description}</span>
            </div>
        </div>
    )
}

export default TitleHeader;