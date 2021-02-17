import React from 'react';
import  './navbar.css'

export default class NavBarComponent extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="header">
            <div><span>Logo</span></div>
            <ul className="nav-links">
                <li className="nav-link-item">Annotate</li>
                <li className="nav-link-item">Train</li>
                <li className="nav-link-item">Predict</li>
                <li className="nav-link-item">Results</li>
                <li className="nav-link-item">Contact</li>
            </ul>
        </div>
        )
    }
};