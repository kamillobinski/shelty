import React from 'react';
import './blogheader.css';

const title = "Shelty";

const BlogHeader = () => {
    return (
        <div>
            <div className="blogHeader-logo">
                <span>{title}</span>
            </div>
        </div>
    )
}

export default BlogHeader;