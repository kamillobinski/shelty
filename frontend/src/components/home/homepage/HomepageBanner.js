import React from 'react';
import homepage_banner from '../../../utils/images/homepage_banner.jpg';
import './homepagebanner.css';

export default class HomepageBanner extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className="homepageBanner">
                <div className="homepageBanner-img" style={{ backgroundImage: "url(" + homepage_banner + ")" }}></div>
            </div>
        )
    }
}