import React from 'react';
import DefaultHeader from '../../components/header/header-default/DefaultHeader';
import PrimaryButton from '../../components/button/PrimaryButton';
import { formatDate, formatDateToDisplay, sortPostsByDate } from '../../functions/Functions';
import { getUserIdFromCookie, getUserAvatar } from "../../api/UserApiFunctions";
import { getPosts, updatePost, deletePost, addPost, getAllPostCategories } from '../../api/BlogApiFunctions';
import './blog.css';
import TextareaAutosize from 'react-textarea-autosize';
import { AddIcon, DeleteIcon, SaveIcon, TickIcon } from '../../utils/icons/Icons';
import StatusMessageHandler from '../../components/status-message/StatusMessageHandler';

export default class Blog extends React.Component {
    constructor() {
        super();
        this.state = {
            userAvatar: "user-avatar-default.jpg",
            userId: "",
            posts: [],
            postCategories: [],
            previewId: "",
            previewTitle: "",
            previewText: "",
            previewCategory: "",
            shouldShowUpdateButton: false,
            currentDate: "",

            shouldShowStatusMessage: false,
            statusMessage: "",
            statusMessageType: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
        this.addPost = this.addPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.markSelected = this.markSelected.bind(this);
        this.renderSaveButton = this.renderSaveButton.bind(this);
        this.hideStatusMessage = this.hideStatusMessage.bind(this);
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

        getAllPostCategories().then((res) => {
            this.setState({ postCategories: res.data })
        })
    }

    showPostPreview(id, title, text, category) {
        if (category !== null) {
            this.setState({ previewId: id, previewTitle: title, previewText: text, previewCategory: category.id, shouldShowUpdateButton: false });
        } else {
            this.setState({ previewId: id, previewTitle: title, previewText: text, previewCategory: "", shouldShowUpdateButton: false });
        }
    }

    updatePost(id, title, text, categoryId) {
        updatePost(id, title, text, categoryId).then(() => {
            this.setState({
                shouldShowUpdateButton: false,
                shouldShowStatusMessage: true,
                statusMessageType: "success",
                statusMessage: "Post has been updated",
            })
            this.getInitialData();
        }).catch(() => {
            this.setState({
                shouldShowStatusMessage: true,
                statusMessageType: "error",
                statusMessage: "An error occurred while updating post",
            });
        });
    }

    deletePost(id) {
        deletePost(id).then(() => {
            this.getInitialData();
            this.setState({
                previewId: "",
                previewTitle: "",
                previewText: "",
                shouldShowStatusMessage: true,
                statusMessageType: "success",
                statusMessage: "Post has been deleted",
            })
        }).catch(() => {
            this.setState({
                shouldShowStatusMessage: true,
                statusMessageType: "error",
                statusMessage: "An error occurred while deleting post",
            });
        });
    }

    addPost(title, text, date, authorId) {
        addPost(title, text, date, authorId).then((res) => {
            this.setState({
                previewId: res.data,
                shouldShowStatusMessage: true,
                statusMessageType: "success",
                statusMessage: "Post has been added",
            })
            this.getInitialData();
        }).catch(() => {
            this.setState({
                shouldShowStatusMessage: true,
                statusMessageType: "error",
                statusMessage: "An error occurred while adding post",
            });
        });
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

    hideStatusMessage() {
        this.setState({ shouldShowStatusMessage: false });
    }

    renderSaveButton() {
        if (this.state.previewId === "" && this.state.previewTitle !== "") {
            return (
                <div style={{ display: "inline-block" }}>
                    <button onClick={() => this.addPost(this.state.previewTitle, this.state.previewText, this.state.currentDate, this.state.userId)} title="Save post" >
                        <SaveIcon fill="#808080" height="10px" />
                    </button>
                </div>
            )
        } else if (this.state.previewId !== "") {
            return (
                <div style={{ display: "inline-block" }}>
                    <button onClick={() => this.updatePost(this.state.previewId, this.state.previewTitle, this.state.previewText, this.state.previewCategory)} title="Update post" >
                        <TickIcon height="10px" fill="#808080" />
                    </button>
                    <button onClick={() => this.deletePost(this.state.previewId)} title="Delete post" >
                        <DeleteIcon height="10px" fill="#808080" />
                    </button>
                    <select
                        name="previewCategory"
                        onChange={this.handleChange}
                        value={this.state.previewCategory}
                        title="Choose post category"
                    >
                        <option value="DEFAULT" label="NO CATEGORY ASSIGNED" style={{ color: "grey" }} />
                        {this.state.postCategories.map((category, i) => (
                            <option
                                value={category.id}
                                label={category.category.toUpperCase()}
                                key={i}
                            />
                        ))};
                    </select>
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
                            <div className="admin-blog-sidebar-list-item" key={post.id} onClick={() => this.showPostPreview(post.id, post.title, post.text, post.category)}>
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
                <StatusMessageHandler
                    shouldShowStatusMessage={this.state.shouldShowStatusMessage}
                    statusMessageType={this.state.statusMessageType}
                    statusMessage={this.state.statusMessage}
                    updateStateOnClose={this.hideStatusMessage}
                />
            </div >
        )
    }
}