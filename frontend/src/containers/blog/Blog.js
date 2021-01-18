import React from 'react';
import DefaultHeader from '../../components/header/header-default/DefaultHeader';
import PrimaryButton from '../../components/button/PrimaryButton';
import { formatDate, formatDateToDisplay, sortPostsByDate } from '../../functions/Functions';
import { getUserIdFromCookie, getUserAvatar } from "../../api/UserApiFunctions";
import { getPosts, updatePost, deletePost, addPost } from '../../api/BlogApiFunctions';
import './blog.css';
import TextareaAutosize from 'react-textarea-autosize';
import { AddIcon, DeleteIcon, SaveIcon, TickIcon } from '../../utils/icons/Icons';

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
        this.updatePost = this.updatePost.bind(this);
        this.markSelected = this.markSelected.bind(this);
        this.renderSaveButton = this.renderSaveButton.bind(this);
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
            this.setState({ previewId: "", previewTitle: "", previewText: "" })
        })
    }

    addPost(title, text, date, authorId) {
        addPost(title, text, date, authorId).then((res) => {
            this.setState({ previewId: res.data })
            this.getInitialData();
        })
    }

    clearPost() {
        this.setState({ previewId: "", previewTitle: "", previewText: "" })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    markSelected(id) {
        if (id === this.state.previewId) {
            return { fontWeight: "600", color: "black" };
        }
    }

    renderSaveButton() {
        if (this.state.previewId === "" && this.state.previewTitle !== "") {
            return (
                <button onClick={() => this.addPost(this.state.previewTitle, this.state.previewText, this.state.currentDate, this.state.userId)} title="Save post" >
                    <SaveIcon fill="#808080" height="10px" />
                </button>
            )
        } else if (this.state.previewId !== "") {
            return (
                <div style={{ display: "inline-block" }}>
                    <button onClick={() => this.updatePost(this.state.previewId, this.state.previewTitle, this.state.previewText)} title="Update post" >
                        <TickIcon height="10px" fill="#808080" />
                    </button>
                    <button onClick={() => this.deletePost(this.state.previewId)} title="Delete post" >
                        <DeleteIcon height="10px" fill="#808080" />
                    </button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="admin-blog">
                <DefaultHeader userAvatar={this.state.userAvatar} />
                <div className="admin-blog-sidebar">
                    <div className="admin-blog-sidebar-title">
                        <span>ALL POSTS</span>
                    </div>
                    <div className="admin-blog-sidebar-list scroll">
                        {this.state.posts.map((post) => (
                            <div className="admin-blog-sidebar-list-item" key={post.id} onClick={() => this.showPostPreview(post.id, post.title, post.text)}>
                                <span style={this.markSelected(post.id)}>{post.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="admin-blog-workspace">
                    <div className="admin-blog-workspace-topbar">
                        <button onClick={() => this.clearPost()} title="Create new post" style={{ display: "inline-block" }}>
                            <AddIcon fill="#000000" height="10px" />
                        </button>
                        {this.renderSaveButton()}
                    </div>
                    <div className="admin-blog-workspace-limiter scroll">
                        <div className="admin-blog-workspace-limiter-inner">
                            <div className="admin-blog-workspace-post-title">
                                <input placeholder="Post title" type="text" name="previewTitle" value={this.state.previewTitle} onChange={(event) => this.handleChange(event)} />
                            </div>
                            <div className="admin-blog-workspace-post-text">
                                <TextareaAutosize spellCheck={false} placeholder="Post text" name="previewText" value={this.state.previewText} onChange={(event) => this.handleChange(event)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}