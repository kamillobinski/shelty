import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL, TOKEN_TYPE } from './Api';

var cookies = new Cookies();
var authToken = cookies.get("token");

export function getPosts() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/all");
}

export function updatePost(id, title, text, categoryId) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.put("/api/post/" + id + "/update", null, {
        params: {
            title,
            text,
            categoryId
        },
    });
}

export function deletePost(id) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.delete("/api/post/" + id + "/delete");
}

export function addPost(title, text, date, authorId) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.post("/api/post/create/", null, {
        params: {
            title,
            text,
            date,
            authorId
        },
    });
}

export function addPostcategory(category) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.post("/api/post-category/" + category + "/create");
}

export function getAllPostCategories() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post-category/all");
}

export function deletePostCategory(id) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.delete("/api/post-category/" + id + "/delete");
}

export function addPostThumbnail(id, formData) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.post("/api/post/" + id + "/create/thumbnail", formData, {
        headers: { "content-type": "multipart/form-data" },
    });
}

export function deleteThumbnail(id) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.delete("/api/post/" + id + "/delete/thumbnail");
}