import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import DefaultAvatar from '../../avatar/default/DefaultAvatar';
import { formatDateToDisplay } from '../../../functions/Functions';
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
                    <span><DefaultAvatar type="user" image={props.post.author.avatar} width="22px" height="22px" /></span>
                    <span>{props.post.author.firstName + " " + props.post.author.lastName}</span>
                    <span>|</span>
                    <span>{formatDateToDisplay(props.post.date)}</span>
                </div>
            </div>
            <div className="blogPostContent-text">
                <TextareaAutosize spellCheck="false" value={props.post.text} readOnly="true" />
            </div>
        </div>
    )
}

export default BlogPostContent;