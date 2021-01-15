import React from 'react';
import './blogheadercontent.css';

const title = "Shelty Blog";
const description = "Follow the Shelty blog for animal announcements, user stories, and valuable posts about adopting."

const BlogHeaderContent = () => {
    return (
        <div className="blogHeaderContent">
            <div className="blogHeaderContent-title">
                <span>{title}</span>
            </div>
            <div className="blogHeaderContent-description">
                <span>{description}</span>
            </div>
        </div>
    )
}

export default BlogHeaderContent;