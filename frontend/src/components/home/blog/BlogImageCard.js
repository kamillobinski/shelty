import React from 'react';
import DefaultAvatar from '../../avatar/default/DefaultAvatar';
import { POST_THUMBNAIL_ROUTE } from '../../../api/Api';
import './blogimagecard.css';

const BlogImageCard = (props) => {

    function checkIfPostCategoryIsAssigned(category) {
        if (category !== null) {
            return category.category.toUpperCase();
        } else {
            return "";
        }
    }

    return (
        <div className="blogImageCard">
            <div className="blogImageCard-thumbnail" style={{ backgroundImage: "url(" + POST_THUMBNAIL_ROUTE + props.post.thumbnail + ")" }}>
                {console.log(props.post.thumbnail)}
            </div>
            <div className="blogImageCard-category">
                <span>{checkIfPostCategoryIsAssigned(props.post.category)}</span>
            </div>
            <div className="blogImageCard-title">
                <span>{props.post.title}</span>
            </div>
            <div className="blogImageCard-description">
                <span>{props.post.text}</span>
            </div>
            <div className="blogImageCard-author">
                <DefaultAvatar type="user" width="17px" height="17px" image={props.post.author.avatar} />
                <span>{props.post.author.firstName + " " + props.post.author.lastName}</span>
            </div>
        </div>
    )
}

export default BlogImageCard;