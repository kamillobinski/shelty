import React from 'react';
import DefaultAvatar from '../../avatar/default/DefaultAvatar';
import './blogtextcard.css';

const BlogTextCard = (props) => {

    function checkIfPostCategoryIsAssigned(category) {
        if (category !== null) {
            return category.category.toUpperCase();
        } else {
            return "";
        }
    }

    return (
        <div className="blogTextCard">
            <div className="blogTextCard-category">
                <span>{checkIfPostCategoryIsAssigned(props.post.category)}</span>
            </div>
            <div className="blogTextCard-title">
                <span>{props.post.title}</span>
            </div>
            <div className="blogTextCard-description">
                <span>{props.post.text}</span>
            </div>
            <div className="blogTextCard-author">
                <DefaultAvatar type="user" width="17px" height="17px" image={props.post.author.avatar} />
                <span>{props.post.author.firstName + " " + props.post.author.lastName}</span>
            </div>
        </div>
    )
}

export default BlogTextCard;