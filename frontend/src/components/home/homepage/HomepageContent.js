import React from 'react';
import { AddIcon } from '../../../utils/icons/Icons';
import PublicHeader from '../../header/header-public/PublicHeader';
import HomepageBanner from '../../home/homepage/HomepageBanner';
import './homepagecontent.css';

const HomepageContent = (props) => {
    return (
        <div className="homepageContent">
            <PublicHeader />
            <HomepageBanner />
            <div className="homepageContent-grid">
                <div className="homepageContent-grid-item">
                    <div className="homepageContent-grid-item-inner">
                        <div className="homepageContent-grid-item-inner-icon">
                            <AddIcon height="15px" fill="black" />
                        </div>
                        <div className="homepageContent-grid-item-inner-title">
                            <span>Checklist for New Adopters</span>
                        </div>
                        <div className="homepageContent-grid-item-inner-description">
                            <span>Help make the transition, as smooth as possible.</span>
                        </div>
                    </div>
                </div>
                <div className="homepageContent-grid-item">
                    <div className="homepageContent-grid-item-inner">
                        <div className="homepageContent-grid-item-inner-icon">
                            <AddIcon height="15px" fill="black" />
                        </div>
                        <div className="homepageContent-grid-item-inner-title">
                            <span>COVID-19 Resources</span>
                        </div>
                        <div className="homepageContent-grid-item-inner-description">
                            <span>Get the latest on adoption processes, learn how local shelters and rescue groups are adapting and find out what you can do to help dogs and cats in need right now.</span>
                        </div>
                    </div>
                </div>
                <div className="homepageContent-grid-item">
                    <div className="homepageContent-grid-item-inner">
                        <div className="homepageContent-grid-item-inner-icon">
                            <AddIcon height="15px" fill="black" />
                        </div>
                        <div className="homepageContent-grid-item-inner-title">
                            <span>Pet Adoption FAQs</span>
                        </div>
                        <div className="homepageContent-grid-item-inner-description">
                            <span>Get answers to questions you haven't thought of.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomepageContent;