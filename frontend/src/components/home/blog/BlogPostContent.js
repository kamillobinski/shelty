import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import DefaultAvatar from '../../avatar/default/DefaultAvatar';
import { formatDateToDisplay } from '../../../functions/Functions';
import { POST_THUMBNAIL_ROUTE } from '../../../api/Api';
import './blogpostcontent.css';

const BlogPostContent = (props) => {

    function renderThumbnail(thumbnail) {
        if (thumbnail !== "" && thumbnail !== null) {
            return { borderRadius: "7px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "450px", marginBottom: "48px", backgroundImage: "url(" + POST_THUMBNAIL_ROUTE + thumbnail + ")" };
        } else {
            return null;
        }
    }

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
                <div className="blogPostContent-thumbnail" style={renderThumbnail(props.post.thumbnail)}></div>
                <TextareaAutosize spellCheck={false} value={props.post.text} readOnly={true} />
            </div>
        </div>
    )
}

export default BlogPostContent;