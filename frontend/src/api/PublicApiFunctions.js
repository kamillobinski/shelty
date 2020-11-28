import axios from "axios";

const BASE_URL = "http://localhost:8081";

export function getLatestAnimals() {
  axios.defaults.baseURL = BASE_URL;
  return axios.get("/api/public/animals/latest");
}

export function getAnimalDetails(id) {
  axios.defaults.baseURL = BASE_URL;
  return axios.get("/api/public/animal/" + id + "/details");
}

export function getBreedOptionsForSpecificSpecies(id) {
  axios.defaults.baseURL = BASE_URL;
  return axios.get("/api/public/get/specific/breeds", {
    params: { id },
  });
}

export function getBreedOptions() {
  axios.defaults.baseURL = BASE_URL;
  return axios.get("/api/public/get/breeds");
}

export function getSpeciesOptions() {
  axios.defaults.baseURL = BASE_URL;
  return axios.get("/api/public/get/species");
}

export function getMatchingAnimals(age, color, breed, gender, size) {
  axios.defaults.baseURL = BASE_URL;
  return axios.get("/api/public/get/matching/animals", {
    params: {
      age,
      color,
      breed,
      gender,
      size,
    },
  });
}
