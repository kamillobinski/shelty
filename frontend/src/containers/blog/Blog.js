import React from 'react';
import DefaultHeader from '../../components/header/header-default/DefaultHeader';
import { formatDate, sortPostsByDate } from '../../functions/Functions';
import { getUserIdFromCookie, getUserAvatar } from "../../api/UserApiFunctions";
import { getPosts, updatePost, deletePost, addPost, getAllPostCategories, addPostThumbnail, deleteThumbnail } from '../../api/BlogApiFunctions';
import './blog.css';
import TextareaAutosize from 'react-textarea-autosize';
import { AddIcon, DeleteIcon, SaveIcon, TickIcon } from '../../utils/icons/Icons';
import StatusMessageHandler from '../../components/status-message/StatusMessageHandler';
import { POST_THUMBNAIL_ROUTE } from '../../api/Api';

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
            previewThumbnail: "",
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
        this.handleUpload = this.handleUpload.bind(this);
        this.renderThumbnailImage = this.renderThumbnailImage.bind(this);
        this.renderThumbnailOptions = this.renderThumbnailOptions.bind(this);
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

    showPostPreview(id, title, text, category, thumbnail) {
        if (category !== null) {
            this.setState({ previewId: id, previewTitle: title, previewText: text, previewCategory: category.id, previewThumbnail: thumbnail, shouldShowUpdateButton: false });
        } else {
            this.setState({ previewId: id, previewTitle: title, previewText: text, previewCategory: "", previewThumbnail: thumbnail, shouldShowUpdateButton: false });
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
                previewThumbnail: "",
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
        this.setState({ previewId: "", previewTitle: "", previewText: "", previewThumbnail: "" })
    }

    handleChange(event) {
        if (event.target.name === "previewThumbnail") {
            var file = event.target;
            const formData = new FormData();
            formData.append("image", file.files[0]);
            addPostThumbnail(this.state.previewId, formData).then((res) => {
                if (res.data !== "") {
                    this.setState({
                        shouldShowStatusMessage: true,
                        statusMessageType: "success",
                        statusMessage: "Thumbnail has been changed",
                        previewThumbnail: res.data
                    })
                    this.getInitialData();
                } else {
                    this.setState({
                        shouldShowStatusMessage: true,
                        statusMessageType: "error",
                        statusMessage: "An error occurred while uploading thumbnail",
                        previewThumbnail: res.data
                    })
                }
            })
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    handleUpload() {
        document.getElementById("hiddenThumbnailInput").click();
    }

    handleThumbnailDelete(id) {
        if (id !== "") {
            deleteThumbnail(id).then(() => {
                this.setState({
                    shouldShowStatusMessage: true,
                    statusMessageType: "success",
                    statusMessage: "Thumbnail has been removed",
                    previewThumbnail: null
                });
                this.getInitialData();
            }).catch(() => {
                this.setState({
                    shouldShowStatusMessage: true,
                    statusMessageType: "error",
                    statusMessage: "An error occurred while removing thumbnail",
                });
            });
        }
    }

    renderThumbnailImage(thumbnail) {
        if (thumbnail !== null && thumbnail !== "") {
            return { backgroundImage: "url(" + POST_THUMBNAIL_ROUTE + this.state.previewThumbnail + ")" };
        } else if ((thumbnail === null || thumbnail === "") && this.state.previewId !== "") {
            return { height: "72px" };
        } else {
            return { height: "0px" };
        }
    }

    renderThumbnailOptions(thumbnail) {
        if (thumbnail !== null && thumbnail !== "" && this.state.previewId !== "") {
            return (<>
                <button onClick={() => this.handleUpload()}>Upload new thumbnail</button>
                <button onClick={() => this.handleThumbnailDelete(this.state.previewId)}>Delete current</button>
            </>);
        } else if ((thumbnail === null || thumbnail === "") && this.state.previewId !== "") {
            return <button onClick={() => this.handleUpload()}>Upload new thumbnail</button>;
        }
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
                            <div className="admin-blog-sidebar-list-item" key={post.id} onClick={() => this.showPostPreview(post.id, post.title, post.text, post.category, post.thumbnail)}>
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
                            <div className="admin-blog-workspace-limiter-inner-image" style={this.renderThumbnailImage(this.state.previewThumbnail)}>
                                <div className="admin-blog-workspace-limiter-inner-image-menu">
                                    {this.renderThumbnailOptions(this.state.previewThumbnail)}
                                </div>
                                <input type="file"
                                    style={{ display: "none" }}
                                    id="hiddenThumbnailInput"
                                    name="previewThumbnail"
                                    onChange={this.handleChange}
                                />
                            </div>
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