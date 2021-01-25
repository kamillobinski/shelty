import { getRoleFromCookie } from '../api/UserApiFunctions';

export function extractTextFromHtml(html) {
  var parsedString = new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
  return removeBlankSpacesFromString(parsedString);
}

export function removeBlankSpacesFromString(string) {
  return string.replace(/\s+/g, ' ').trim();
}

export function getTomorrowDate() {
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
}

export function redirectUser(link) {
  return window.location.replace(link);
}

export function checkIfAdmin() {
  var role = getRoleFromCookie();
  if (role === "ROLE_USER") {
    window.history.go(-1);
    alert('Admin restricted content')
  }
}

export function formatDate(date) {
  if (date !== null) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  } else {
    return "";
  }
}

export function formatDateToDisplay(date) {
  if (date !== null) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  } else {
    return "";
  }
}

export function sortAnimalsAlphabetically(animals) {
  return animals.sort((a, b) => a.name.localeCompare(b.name));
}

export function sortPostsByDate(list) {
  list.sort(function compare(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateB - dateA;
  });

  return list;
}

export function searchListForAnimal(animal, animalList) {
  return animalList.filter(
    (x) =>
      x.name.toLowerCase().includes(animal.toLowerCase()) ||
      x.name.toLowerCase() === animal.toLowerCase() ||
      x.breed.breedName.toLowerCase().includes(animal.toLowerCase()) ||
      x.breed.breedName.toLowerCase() === animal.toLowerCase() ||
      x.breed.species.speciesName
        .toLowerCase()
        .includes(animal.toLowerCase()) ||
      x.breed.species.speciesName.toLowerCase() === animal.toLowerCase()
  );
}

export function changePageTitle(title) {
  document.title = title;
}

/*
 * ANIMAL FINDER
 */
export function filterFinderList(
  list,
  age,
  color,
  species,
  breed,
  gender,
  size
) {
  var ageResult = filterByAge(list, age);
  var colorResult = filterByColors(ageResult, color);
  var speciesResult = filterBySpecies(colorResult, species);
  var breedResult = filterByBreed(speciesResult, breed);
  var genderResult = filterByGender(breedResult, gender);
  var sizeResult = filterBySize(genderResult, size);

  return sizeResult;
}

function filterByColors(list, color) {
  if (color !== "DEFAULT" && color !== "" && color !== "Any") {
    // Create array of colors from string
    // Important: text can contain several
    // colors at once which are divided by " " or ","
    var filters = color.match(/(?:(?<=\bstack)\w+|\b(?!stack)\w+)(?=[, ]|$)/g);
    var resultList = [];

    // Iterate over list of animals
    for (var i = 0; i < list.length; i++) {
      if (list[i].color !== null && list[i].color !== "") {
        // Create array of animal colors from string
        // Important: text can contain several
        // colors at once which are divided by " " or ","
        var animalColors = list[i].color.match(
          /(?:(?<=\bstack)\w+|\b(?!stack)\w+)(?=[, ]|$)/g
        );

        // Check which animal has all the colors
        // specified by the user
        // eslint-disable-next-line
        var result = filters.every(function (value) {
          return animalColors.indexOf(value) !== -1;
        });

        // If animal matches input, put it in a separate list,
        // which will be finally returned
        if (result) {
          resultList.push(list[i]);
        }
      }
    }
    return resultList;
  } else {
    return list;
  }
}

function filterBySpecies(list, species) {
  if (species !== "DEFAULT" && species !== "") {
    return list.filter((x) => x.breed.species.id === parseInt(species));
  } else {
    return list;
  }
}

function filterBySize(list, size) {
  if (size !== "DEFAULT" && size !== "") {
    return list.filter((x) => x.size.type === size.toLowerCase());
  } else {
    return list;
  }
}

function filterByGender(list, gender) {
  if (gender !== "DEFAULT" && gender !== "") {
    return list.filter((x) => x.gender.type === gender.toLowerCase());
  } else {
    return list;
  }
}

function filterByBreed(list, breed) {
  if (breed !== "DEFAULT" && breed !== "") {
    return list.filter((x) => x.breed.id === parseInt(breed));
  } else {
    return list;
  }
}

function filterByAge(list, age) {
  var startAge, endAge;

  switch (age) {
    case "Puppy": {
      startAge = 0;
      endAge = 0;
      return list.filter((x) => x.age >= startAge && x.age <= endAge);
    }
    case "Young": {
      startAge = 1;
      endAge = 3;
      return list.filter((x) => x.age >= startAge && x.age <= endAge);
    }
    case "Adult": {
      startAge = 4;
      endAge = 8;
      return list.filter((x) => x.age >= startAge && x.age <= endAge);
    }
    case "Senior": {
      startAge = 9;
      endAge = 40;
      return list.filter((x) => x.age >= startAge && x.age <= endAge);
    }
    default: {
      startAge = 0;
      endAge = 40;
      return list;
    }
  }
}


