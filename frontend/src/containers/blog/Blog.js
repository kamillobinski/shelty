import React from 'react';
import DefaultHeader from '../../components/header/header-default/DefaultHeader';
import PrimaryButton from '../../components/button/PrimaryButton';
import { formatDate, formatDateToDisplay, sortPostsByDate } from '../../functions/Functions';
import { getUserIdFromCookie, getUserAvatar } from "../../api/UserApiFunctions";
import { getPosts, updatePost, deletePost, addPost } from '../../api/BlogApiFunctions';
import './blog.css';
import TextareaAutosize from 'react-textarea-autosize';

export default class Blog extends React.Component {
    constructor() {
        super();
        this.state = {
            userAvatar: "user-avatar-default.jpg",
            userId: "",
            posts: [],
            previewId: "",
            previewTitle: "",
            previewText: "",
            shouldShowUpdateButton: false,
            currentDate: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
        this.addPost = this.addPost.bind(this);
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData() {
        var cookieUserId = getUserIdFromCookie();
        this.setState({ userId: cookieUserId });
        getUserAvatar(cookieUserId).then((res) => {
            this.setState({ userAvatar: res.data });
        });

        var currentDate = new Date();
        var formattedDate = formatDate(currentDate);
        this.setState({ currentDate: formattedDate });

        getPosts().then((res) => {
            this.setState({ posts: sortPostsByDate(res.data) })
        })
    }

    showPostPreview(id, title, text) {
        this.setState({ previewId: id, previewTitle: title, previewText: text, shouldShowUpdateButton: false });
    }

    updatePost(id, title, text) {
        updatePost(id, title, text).then(() => {
            this.setState({ shouldShowUpdateButton: false })
            this.getInitialData();
        });
    }

    deletePost(id) {
        deletePost(id).then(() => {
            this.getInitialData();
            this.setState({ previewId: "", previewTitle: "Title", previewText: "Text content" })
        })
    }

    addPost(title, text, date, authorId) {
        addPost(title, text, date, authorId).then(() => {
            this.getInitialData();
        })
    }

    clearPost() {
        this.setState({ previewId: "", previewTitle: "", previewText: "" })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        /*bg grey #f5f5f5 */
        /* map function
        {this.state.posts.map((post) => (
            */
        return (
            <div className="admin-blog">
                <DefaultHeader userAvatar={this.state.userAvatar} />
                <div className="admin-blog-sidebar">
                    <div className="admin-blog-sidebar-title">
                        <span>ALL POSTS</span>
                        <span style={{ color: "black", marginLeft: "calc(100% - 124px)", cursor: "pointer" }} onClick={() => this.clearPost()}> NEW POST</span>
                    </div>
                    <div className="admin-blog-sidebar-list scroll">
                        {this.state.posts.map((post) => (
                            <div className="admin-blog-sidebar-list-item" key={post.id} onClick={() => this.showPostPreview(post.id, post.title, post.text)} onContextMenu={() => this.deletePost(post.id)}>
                                <span>{post.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="admin-blog-workspace scroll">
                    <div className="admin-blog-workspace-publish-btn">
                        <PrimaryButton text="Publish" type="orange" onClick={() => this.addPost(this.state.previewTitle, this.state.previewText, this.state.currentDate, this.state.userId)} />
                    </div>
                    <div className="admin-blog-workspace-limiter">
                        <div className="admin-blog-workspace-post-title">
                            <input placeholder="Post title" type="text" name="previewTitle" value={this.state.previewTitle} onChange={(event) => this.handleChange(event)} />
                        </div>
                        <div className="admin-blog-workspace-post-text">
                            <TextareaAutosize spellCheck={false} placeholder="Post text" name="previewText" value={this.state.previewText} onChange={(event) => this.handleChange(event)} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}