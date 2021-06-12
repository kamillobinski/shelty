import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL, TOKEN_TYPE } from './Api';

var cookies = new Cookies();
var authToken = cookies.get("token");

export function getAnimal(id) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/animal/" + id);
}

export function getAnimalId(name) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/animal/" + name + "/id");
}

export function getAnimals() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/animal/all");
}

export function getGenderOptions() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/gender/all");
}

export function getBreedOptions() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/breed/all", {
    params: { sorted: true },
  });
}

export function getHouseTrainedOptions() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/house-trained/all");
}

export function getSizeOptions() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/size/all");
}

export function getCoatLengthOptions() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/coat-length/all");
}

export function getSpeciesOptions() {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/species/all");
}

export function addSpeciesOption(name) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.post("/api/species/create", null, {
    params: { speciesName: name },
  });
}

export function deleteSpeciesOption(id) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("/api/species/" + id + "/delete");
}

export function addBreedOption(breedName, speciesId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.post("/api/breed/create", null, {
    params: {
      breedName,
      speciesId,
    },
  });
}

export function deleteBreedOption(breedId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("/api/breed/" + breedId + "/delete");
}

export function updateAnimal(
  id,
  name,
  dateOfBirth,
  age,
  size,
  breed,
  gender,
  color,
  coatLength,
  dateArrivedInShelter,
  dateAdopted,
  identichip,
  houseTrained,
  isReady,
  comments
) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("/api/animal/" + id + "/update", null, {
    params: {
      id,
      name,
      dateOfBirth,
      age,
      size,
      breed,
      gender,
      color,
      coatLength,
      dateArrivedInShelter,
      dateAdopted,
      identichip,
      houseTrained,
      isReady,
      comments,
    },
  });
}

export function deleteAnimal(id) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("/api/animal/" + id + "/delete");
}

export function deleteGalleryImages(id) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("/api/images/" + id + "/delete/all");
}

export function updateAnimalAvatar(id, formData) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("/api/animal/" + id + "/update-avatar", formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function addAnimalGalleryImage(animalId, image) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.post("/api/images/" + animalId + "/save", image, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function deleteGalleryImage(imageId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("/api/images/" + imageId + "/delete");
}

export function getAnimalGalleryImages(animalId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/images/fetch/all/" + animalId);
}

export function addNewAnimal(
  name,
  dateOfBirth,
  age,
  size,
  breed,
  gender,
  color,
  dateArrivedInShelter,
  dateAdopted,
  identichip,
  houseTrained,
  comments,
  coatLength,
  isReady
) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.post("/api/animal/create", null, {
    params: {
      name,
      dateOfBirth,
      age,
      size,
      breed,
      gender,
      color,
      dateArrivedInShelter,
      dateAdopted,
      identichip,
      houseTrained,
      comments,
      coatLength,
      isReady,
    },
  });
}

export function setAnimalAvatarFromGalleryImage(imageId, animalId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("/api/images/" + animalId + "/" + imageId + "/set/avatar");
}

/*
 * MEDICAL DATA
 */

// save
export function saveMedicalData(
  animalId,
  graftingDate,
  dewormingDate,
  sterilizationDate,
  description
) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("/api/medical-data/" + animalId + "/update", null, {
    params: {
      graftingDate,
      dewormingDate,
      sterilizationDate,
      description,
    },
  });
}

// fetch
export function getMedicalData(animalId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("api/medical-data/" + animalId);
}

// delete
export function deleteMedicalData(animalId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("api/medical-data/" + animalId + "/delete");
}

/* 
 * Medical History
 */

// fetch
export function getMedicalHistory(animalId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("api/medical-history/" + animalId);
}

export function addMedicalHistoryItem(animalId, type, medicine, vet, date, isCompleted) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.post("api/medical-history/" + animalId + "/create", null, {
    params: {
      type,
      medicine,
      vet,
      date,
      isCompleted,
    },
  });
}

export function deleteMedicalHistoryItem(medicalHistoryId) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("api/medical-history/" + medicalHistoryId + "/delete");
}

export function updateMedicalHistoryItemStatus(medicalHistoryId, status) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("api/medical-history/" + medicalHistoryId + "/update/status", null, {
    params: {
      status
    }
  });
}