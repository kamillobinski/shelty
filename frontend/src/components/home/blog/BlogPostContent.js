import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import './blogpostcontent.css';

const BlogPostContent = (props) => {
    return (
        <div className="blogPostContent">
            <div className="blogPostContent-header">
                <div className="blogPostContent-back">
                    <Link to="/blog">
                        <button><span>{'<'}</span></button>
                    </Link>
                </div>
                <div className="blogPostContent-title">
                    <span>{props.post.title}</span>
                </div>
                <div className="blogPostContent-author">
                    <span>{props.post.author.firstName + " " + props.post.author.lastName}</span>
                </div>
            </div>
            <div className="blogPostContent-text">
                <TextareaAutosize spellCheck="false" value={props.post.text} readOnly="true" />
            </div>
        </div>
    )
}

export default BlogPostContent;