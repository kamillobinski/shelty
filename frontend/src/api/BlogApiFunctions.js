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

export function updatePost(id, title, text) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/update/" + id, {
        params: {
            title,
            text,
        },
    });
}

export function deletePost(id) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/delete/" + id);
}

export function addPost(title, text) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
    return axios.get("/api/post/add/", {
        params: {
            title,
            text,
        },
    });
}