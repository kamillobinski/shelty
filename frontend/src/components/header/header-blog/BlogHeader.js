import React from 'react';
import { Link } from 'react-router-dom';
import './blogheader.css';

const title = "Shelty";

const BlogHeader = () => {
    return (
        <div className="blogHeader-logo">
            <Link to="/">
                <span>{title}</span>
            </Link>
        </div>
    )
}

export default BlogHeader;