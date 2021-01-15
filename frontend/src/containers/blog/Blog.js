import React from 'react';
import DefaultHeader from '../../components/header/header-default/DefaultHeader';
import TextInputExtended from '../../components/input/textarea/TextInputExtended';
import PrimaryButton from '../../components/button/PrimaryButton';
import { formatDate } from '../../functions/Functions';
import { getUserIdFromCookie, getUserAvatar } from "../../api/UserApiFunctions";
import { getPosts, updatePost, deletePost, addPost } from '../../api/BlogApiFunctions';
import './blog.css';

export default class Blog extends React.Component {
    constructor() {
        super();
        this.state = {
            userAvatar: "user-avatar-default.jpg",
            userId: "",
            posts: [],
            previewId: "",
            previewTitle: "Title",
            previewText: "Text content",
            shouldShowUpdateButton: false,
            currentDate: ""
        };
        this.handleChange = this.handleChange.bind(this);
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
            this.setState({ posts: res.data })
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

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, shouldShowUpdateButton: true });
    }

    render() {
        return (
            <div className="admin-blog"><DefaultHeader userAvatar={this.state.userAvatar} />
                <div className="admin-blog-table">
                    <table border="0">
                        {this.state.posts.map((post, i) => (
                            <tr>
                                <td>{i + 1}. {post.title}</td>
                                <td>
                                    <PrimaryButton
                                        text="PREVIEW"
                                        type=""
                                        width="100%"
                                        onClick={() => this.showPostPreview(post.id, post.title, post.text)}
                                    />
                                </td>
                                <td>
                                    <PrimaryButton
                                        text="DELETE"
                                        type="red"
                                        width="100%"
                                        onClick={() => this.deletePost(post.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3">
                                <PrimaryButton
                                    text="Add new post"
                                    type="dark"
                                    width="100%"
                                    onClick={() => addPost("New empty post", "Place your text here...", this.state.currentDate, this.state.userId).then(() => {
                                        this.getInitialData()
                                    })}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="admin-blog-preview">
                    <div className="admin-blog-preview-title">
                        <TextInputExtended
                            name="previewTitle"
                            value={this.state.previewTitle}
                            onChange={this.handleChange}
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className="admin-blog-preview-text">
                        <TextInputExtended
                            name="previewText"
                            value={this.state.previewText}
                            onChange={this.handleChange}
                            width="100%"
                            height="100%"
                        />
                    </div>
                    {this.state.shouldShowUpdateButton && this.state.previewId !== "" ? (
                        <PrimaryButton
                            text="Update"
                            type="dark"
                            width="100px"
                            onClick={() => this.updatePost(this.state.previewId, this.state.previewTitle, this.state.previewText)}
                        />
                    ) : (null)}
                </div>
            </div>
        )
    }
}