export function getTomorrowDate() {
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
}

export function redirectUser(link) {
  return window.location.replace(link);
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

export function sortAnimalsAlphabetically(animals) {
  return animals.sort((a, b) => a.name.localeCompare(b.name));
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
export function filterFinderList(list, age, color, breed, gender, size) {
  var ageResult = filterByAge(list, age);
  var breedResult = filterByBreed(ageResult, breed);
  var genderResult = filterByGender(breedResult, gender);
  var sizeResult = filterBySize(genderResult, size);

  return sizeResult;
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
