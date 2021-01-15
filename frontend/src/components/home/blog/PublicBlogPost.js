import React from 'react';
import { Redirect } from 'react-router-dom';
import BlogHeader from '../../header/header-blog/BlogHeader';
import BlogPostContent from './BlogPostContent';
import './publicblogpost.css';

class PublicBlogPost extends React.Component {
    constructor(props) {
        super(props);
    }

    verifyState() {
        if (this.props.location.state !== undefined) {
            return (
                <div className="publicBlogPost">
                    <div className="publicBlogPost-inner">
                        <BlogHeader />
                        <BlogPostContent post={this.props.location.state.post} />
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to="/blog" />
            )
        }
    }

    render() {
        return this.verifyState()
    }
}

export default PublicBlogPost;