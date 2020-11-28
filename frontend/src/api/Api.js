import axios from "axios";

// Axios config for communication with Spring Boot backend
export default axios.create({
  baseURL: "http://localhost:8081",
  responseType: "json",
});
