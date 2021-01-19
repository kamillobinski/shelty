import React from 'react';
import BlogHeader from '../../header/header-blog/BlogHeader';
import BlogHeaderContent from './BlogHeaderContent';
import BlogGrid from './BlogGrid';
import { getBlogPosts } from '../../../api/PublicApiFunctions';
import { sortPostsByDate } from '../../../functions/Functions';
import './blog.css';

export default class Blog extends React.Component {
    constructor() {
        super();
        this.state = { posts: [], windowWidth: "" }
        this.updateDimension = this.updateDimension.bind(this);
    }

    componentDidMount() {
        this.updateDimension();
        window.addEventListener('resize', this.updateDimension);
        getBlogPosts().then((res) => {
            this.setState({ posts: sortPostsByDate(res.data) })
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    updateDimension() {
        this.setState({ windowWidth: window.innerWidth });
    }

    render() {
        return (
            <div className="publicBlog">
                <div className="publicBlog-inner">
                    <BlogHeader />
                    <BlogHeaderContent />
                    <BlogGrid posts={this.state.posts} windowWidth={this.state.windowWidth} />
                </div>
            </div>
        )
    }
}