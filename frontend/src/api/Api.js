import axios from "axios";

// Axios config for communication with Spring Boot backend
export default axios.create({
  baseURL: "http://localhost:8081",
  responseType: "json",
});

export const BASE_URL = "http://localhost:8081";
export const TOKEN_TYPE = "Bearer ";
export const POST_THUMBNAIL_ROUTE = "http://localhost:8081/images/post/thumbnail/";
export const USER_AVATAR_ROUTE = "http://localhost:8081/images/user/avatar/";
export const ANIMAL_AVATAR_ROUTE = "http://localhost:8081/images/animal/avatar/";
export const ANIMAL_GALLERY_ROUTE = "http://localhost:8081/images/animal/gallery/";