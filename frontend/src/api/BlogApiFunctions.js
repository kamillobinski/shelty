import axios from "axios";
import Cookies from "universal-cookie";

var cookies = new Cookies();
var authToken = cookies.get("token");

const BASE_URL = "http://localhost:8081";
const TOKEN_TYPE = "Bearer ";

export function getPosts() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/get/all");
}

export function updatePost(id, title, text, categoryId) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/update/" + id, {
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
    return axios.get("/api/post/delete/" + id);
}

export function addPost(title, text, date, authorId) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/add/", {
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
    return axios.post("/api/post/category/add/" + category);
}

export function getAllPostCategories() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/category/get/all");
}

export function deletePostCategory(id) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.delete("/api/post/category/delete/" + id);
}

export function addPostThumbnail(id, formData) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.post("/api/post/" + id + "/add/thumbnail", formData, {
        headers: { "content-type": "multipart/form-data" },
    });
}