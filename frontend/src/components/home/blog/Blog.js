import React from 'react';
import BlogHeader from '../../header/header-blog/BlogHeader';
import BlogHeaderContent from './BlogHeaderContent';
import BlogGrid from './BlogGrid';
import { getBlogPosts } from '../../../api/PublicApiFunctions';
import './blog.css';

export default class Blog extends React.Component {
    constructor() {
        super();
        this.state = { posts: [] }
    }

    componentDidMount() {
        getBlogPosts().then((res) => {
            this.setState({ posts: res.data })
        })
    }

    render() {
        return (
            <div className="publicBlog">
                <BlogHeader />
                <BlogHeaderContent />
                <BlogGrid posts={this.state.posts} />
            </div>
        )
    }
}