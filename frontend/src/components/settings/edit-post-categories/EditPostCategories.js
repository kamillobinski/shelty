import React from 'react';
import TextInput from '../../input/text/TextInput';
import { addPostcategory, getAllPostCategories, deletePostCategory } from '../../../api/BlogApiFunctions';
import PrimaryButton from '../../button/PrimaryButton';
import './editpostcategories.css';

class EditPostCategories extends React.Component {
    constructor() {
        super();
        this.state = { newCategory: "", categories: [] }
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData() {
        getAllPostCategories().then((res) => {
            this.setState({ categories: res.data })
        })
    }

    handleAddButtonClick(category) {
        addPostcategory(category).then(() => {
            this.getInitialData();
            this.setState({ newCategory: "" })
        })
    }

    handleDeleteButtonClick(id) {
        deletePostCategory(id).then(() => {
            this.getInitialData();
        })
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="editBlogCategories">
                <div className="editBlogCategories-inner">
                    <TextInput
                        label="Category:"
                        width="100%"
                        name="newCategory"
                        value={this.state.newCategory}
                        onChange={this.handleInputChange}
                    />
                    <PrimaryButton
                        text="Add"
                        width="100px"
                        type="light"
                        onClick={() => this.handleAddButtonClick(this.state.newCategory)}
                    />
                    <div className="editBlogCategories-inner-list">
                        {this.state.categories.map((category, i) => (
                            < div className="editBlogCategories-inner-list-item" key={i} >
                                <TextInput
                                    key={category.id}
                                    type="text"
                                    label={"Category #" + i}
                                    name="breed"
                                    value={category.category}
                                    width="100%"
                                    height="30px"
                                    margin="0 120px 0 0"
                                    readOnly={true}
                                />
                                <div className="editBlogCategories-inner-list-item-delete-btn">
                                    <PrimaryButton
                                        text="Remove"
                                        width="100px"
                                        type="red"
                                        onClick={() => this.handleDeleteButtonClick(category.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        )
    }
}

export default EditPostCategories;