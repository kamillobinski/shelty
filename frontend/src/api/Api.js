import axios from "axios";

// Axios config for communication with Spring Boot backend
export default axios.create({
  baseURL: "http://localhost:8081",
  responseType: "json",
});

export const POST_THUMBNAIL_ROUTE = "http://localhost:8081/images/post/thumbnail/";