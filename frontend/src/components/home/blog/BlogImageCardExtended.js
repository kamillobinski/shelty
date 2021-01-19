import React from 'react';
import DefaultAvatar from '../../avatar/default/DefaultAvatar';
import { POST_THUMBNAIL_ROUTE } from '../../../api/Api';
import './blogimagecardextended.css';

const BlogImageCardExtended = (props) => {

    function checkIfPostCategoryIsAssigned(category) {
        if (category !== null) {
            return category.category.toUpperCase();
        } else {
            return "";
        }
    }

    return (
        <div className="blogImageCardExtended">
            <div className="blogImageCardExtended-thumbnail" style={{ backgroundImage: "url(" + POST_THUMBNAIL_ROUTE + props.post.thumbnail + ")" }}>
                {console.log(props.post.thumbnail)}
            </div>
            <div className="blogImageCardExtended-right-content">
                <div className="blogImageCardExtended-category">
                    <span>{checkIfPostCategoryIsAssigned(props.post.category)}</span>
                </div>
                <div className="blogImageCardExtended-title">
                    <span>{props.post.title}</span>
                </div>
                <div className="blogImageCardExtended-description">
                    <span>{props.post.text}</span>
                </div>
                <div className="blogImageCardExtended-author">
                    <DefaultAvatar type="user" width="17px" height="17px" image={props.post.author.avatar} />
                    <span>{props.post.author.firstName + " " + props.post.author.lastName}</span>
                </div>
            </div>
        </div>
    )
}

export default BlogImageCardExtended;