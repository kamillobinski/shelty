import React from 'react';
import BlogTextCard from './BlogTextCard';
import './bloggrid.css';
import { Link } from 'react-router-dom';
import BlogImageCard from './BlogImageCard';
import BlogImageCardExtended from './BlogImageCardExtended';

const BlogGrid = (props) => {

    function renderCard(post, index) {
        if (post.thumbnail !== null && post.thumbnail !== "" && index > 0) {
            return (
                <div className="blogGrid-item" key={post.id}>
                    <Link to={{ pathname: "/blog/post/" + post.id, state: { post: post } }}>
                        <BlogImageCard post={post} />
                    </Link>
                </div>
            )
        } else if (post.thumbnail !== null && post.thumbnail !== "" && index === 0 && props.windowWidth > 1024) {
            return (
                <div className="blogGrid-item" key={post.id} style={{ height: "350px" }}>
                    <Link to={{ pathname: "/blog/post/" + post.id, state: { post: post } }}>
                        <BlogImageCardExtended post={post} />
                    </Link>
                </div>
            )
        } else if (post.thumbnail !== null && post.thumbnail !== "" && index === 0 && props.windowWidth <= 1024) {
            return (
                <div className="blogGrid-item" key={post.id}>
                    <Link to={{ pathname: "/blog/post/" + post.id, state: { post: post } }}>
                        <BlogImageCard post={post} />
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="blogGrid-item" key={post.id}>
                    <Link to={{ pathname: "/blog/post/" + post.id, state: { post: post } }}>
                        <BlogTextCard post={post} />
                    </Link>
                </div>
            )
        }
    }

    return (
        <div className="blogGrid">
            {props.posts.map((post, i) => (
                renderCard(post, i)
            ))}
        </div>
    )
}

export default BlogGrid;