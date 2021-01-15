import React from 'react';
import BlogTextCard from './BlogTextCard';
import './bloggrid.css';
import { Link } from 'react-router-dom';

const BlogGrid = (props) => {
    return (
        <div className="blogGrid">
            {props.posts.map((post) => (
                <div className="blogGrid-item" key={post.id}>
                    <Link to={{ pathname: "/blog/post/" + post.id, state: { post: post } }}>
                        <BlogTextCard post={post} />
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default BlogGrid;