import React from 'react';
import DefaultHeader from '../../components/header/header-default/DefaultHeader';
import { formatDate, sortPostsByDate } from '../../functions/Functions';
import { getUserIdFromCookie, getUserAvatar } from "../../api/UserApiFunctions";
import { getPosts, updatePost, deletePost, addPost, getAllPostCategories, addPostThumbnail, deleteThumbnail } from '../../api/BlogApiFunctions';
import { AddIcon, DeleteIcon, ImageIcon, SaveIcon, TickIcon } from '../../utils/icons/Icons';
import StatusMessageHandler from '../../components/status-message/StatusMessageHandler';
import { POST_THUMBNAIL_ROUTE } from '../../api/Api';
import { Editor } from '@tinymce/tinymce-react';
import { TINY_API_KEY } from '../../protected/TinyMCE-api-key';
import './blog.css';

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

            showThumbnailMenu: false,
            shouldShowStatusMessage: false,
            statusMessage: "",
            statusMessageType: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
        this.addPost = this.addPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.markSelectedPostListItem = this.markSelectedPostListItem.bind(this);
        this.renderTopbarButtons = this.renderTopbarButtons.bind(this);
        this.hideStatusMessage = this.hideStatusMessage.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.renderThumbnailImage = this.renderThumbnailImage.bind(this);
        this.renderThumbnailOptions = this.renderThumbnailOptions.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.toggleThumbnailMenu = this.toggleThumbnailMenu.bind(this);
        this.renderThumbnailMenu = this.renderThumbnailMenu.bind(this);
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
        this.setState({ previewId: "", previewTitle: "", previewText: "", previewThumbnail: "", previewCategory: "" })
    }

    deleteThumbnail(id) {
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

    markSelectedPostListItem(id) {
        if (id === this.state.previewId) {
            return { fontWeight: "600", color: "black" };
        }
    }

    toggleThumbnailMenu(state) {
        this.setState({ shouldShowThumbnailMenu: !state })
    }

    renderThumbnailMenu(state, thumbnail) {
        if (state) {
            return (
                <div className="thumbnailMenu">
                    <div className="thumbnailMenu-preview" style={this.renderThumbnailImage(thumbnail)}>
                        <input type="file"
                            style={{ display: "none" }}
                            id="hiddenThumbnailInput"
                            name="previewThumbnail"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="thumbnailMenu-buttons">
                        {this.renderThumbnailOptions(thumbnail)}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    renderThumbnailImage(thumbnail) {
        if (thumbnail !== null && thumbnail !== "") {
            return {
                backgroundImage: "url(" + POST_THUMBNAIL_ROUTE + thumbnail + ")",
            };
        } else {
            return {
                backgroundColor: "#ffffff",
                opacity: 1,
                backgroundImage: "repeating-linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef), repeating-linear-gradient(45deg, #efefef 25%, #ffffff 25%, #ffffff 75%, #efefef 75%, #efefef)",
                backgroundPosition: "0 0, 10px 10px",
                backgroundSize: "20px 20px"
            };
        }
    }

    renderThumbnailOptions(thumbnail) {
        if (thumbnail !== null && thumbnail !== "" && this.state.previewId !== "") {
            return (<>
                <button onClick={() => this.handleUpload()}>Upload new</button>
                <button onClick={() => this.deleteThumbnail(this.state.previewId)}>Delete current</button>
            </>);
        } else if ((thumbnail === null || thumbnail === "") && this.state.previewId !== "") {
            return <button style={{ gridColumn: "1/-1" }
            } onClick={() => this.handleUpload()}> Upload new</button >;
        }
    }

    renderTopbarButtons() {
        if (this.state.previewId === "" && this.state.previewTitle !== "") {
            return (
                /* Save post button */
                <div style={{ display: "inline-block" }} className="save">
                    <button onClick={() => this.addPost(this.state.previewTitle, this.state.previewText, this.state.currentDate, this.state.userId)} title="Save post" >
                        <SaveIcon fill="#000000" height="10px" />
                    </button>
                </div>
            )
        } else if (this.state.previewId !== "") {
            return (
                <div style={{ display: "inline-block" }}>
                    {/* Update post button */}
                    <button onClick={() => this.updatePost(this.state.previewId, this.state.previewTitle, this.state.previewText, this.state.previewCategory)} title="Update post" >
                        <TickIcon height="10px" fill="#000000" />
                    </button>
                    {/* Dlete post button */}
                    <button onClick={() => this.deletePost(this.state.previewId)} title="Delete post" >
                        <DeleteIcon height="10px" fill="#000000" />
                    </button>
                    {/* Category select */}
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
                    {/* Thumbnail options */}
                    <button onClick={() => this.toggleThumbnailMenu(this.state.shouldShowThumbnailMenu)} title="Thumbnail options" >
                        <ImageIcon height="12px" fill="#000000" />
                    </button>
                </div>
            )
        }
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

    handleEditorChange = (editorContent) => {
        this.setState({ previewText: editorContent });
    }

    hideStatusMessage() {
        this.setState({ shouldShowStatusMessage: false });
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
                                <span style={this.markSelectedPostListItem(post.id)}>{post.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="admin-blog-workspace">
                    <div className="admin-blog-workspace-topbar">
                        <button onClick={() => this.clearPost()} title="Create new post" style={{ display: "inline-block" }}>
                            <AddIcon fill="#000000" height="10px" />
                        </button>
                        <input className="title" placeholder="Post title" type="text" name="previewTitle" value={this.state.previewTitle} onChange={(event) => this.handleChange(event)} />
                        {this.renderTopbarButtons()}
                        {this.renderThumbnailMenu(this.state.shouldShowThumbnailMenu, this.state.previewThumbnail)}
                    </div>
                    <div className="admin-blog-workspace-limiter scroll">
                        <div className="admin-blog-workspace-limiter-inner">
                            <div className="admin-blog-workspace-post-text">
                                <Editor
                                    apiKey={TINY_API_KEY}
                                    value={this.state.previewText}
                                    init={{
                                        content_css: "writer",
                                        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons | help',
                                        toolbar2: 'preview code | forecolor backcolor',
                                        image_advtab: true,
                                        branding: false,
                                        height: '871',
                                        menubar: 'file edit insert view format table tools help',
                                        plugins: [
                                            'advlist autolink lists link image',
                                            'charmap print preview anchor help',
                                            'searchreplace visualblocks code',
                                            'insertdatetime media table paste wordcount',
                                            'emoticons'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic | \
                                            alignleft aligncenter alignright | \
                                            bullist numlist outdent indent | help'
                                    }}
                                    onEditorChange={this.handleEditorChange}
                                />
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