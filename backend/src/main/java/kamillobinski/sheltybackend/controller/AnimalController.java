package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/animal")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping("/create")
    public void createAnimal(@RequestParam String name, @RequestParam String dateOfBirth, @RequestParam String age, @RequestParam String size,
                             @RequestParam String breed, @RequestParam String gender, @RequestParam String color,
                             @RequestParam String dateArrivedInShelter, @RequestParam String dateAdopted, @RequestParam String identichip,
                             @RequestParam String houseTrained, @RequestParam String comments, @RequestParam String coatLength, @RequestParam Boolean isReady) throws ParseException {
        animalService.addAnimal(name, dateOfBirth, age, size, breed, gender, color, coatLength, dateArrivedInShelter, dateAdopted, identichip, houseTrained, comments, isReady);
    }

    @GetMapping("/{id}")
    public Animal getAnimal(@PathVariable String id) { return animalService.getAnimal(id); }

    @GetMapping("/{name}/id")
    public int getAnimalId(@PathVariable String name) { return animalService.getAnimalId(name); }

    @GetMapping("/{id}/avatar")
    public String getAnimalAvatar(@PathVariable String id) {
        return animalService.getAnimalAvatar(id);
    }

    @GetMapping("/all")
    public List<Animal> getAnimals() { return animalService.getAllAnimals(); }

    @PutMapping("/{id}/update")
    public void updateAnimal(@PathVariable String id, @RequestParam String name, @RequestParam String dateOfBirth, @RequestParam String age,
                             @RequestParam String size, @RequestParam String breed, @RequestParam String gender, @RequestParam String color,
                             @RequestParam String dateArrivedInShelter, @RequestParam String dateAdopted, @RequestParam String identichip,
                             @RequestParam String houseTrained, @RequestParam String comments, @RequestParam Boolean isReady, @RequestParam String coatLength) throws ParseException {
        animalService.updateAnimal(id, name, dateOfBirth, age, size, breed, gender, color, coatLength, dateArrivedInShelter, dateAdopted, identichip, houseTrained, isReady, comments);
    }

    @PutMapping(value="/{id}/update-avatar" , headers = "content-type=multipart/*")
    public void updateAnimalAvatar(@PathVariable String id, @RequestParam(value = "image") MultipartFile image ) {
        animalService.updateAnimalAvatar(id, image);
    }

    @DeleteMapping("/{id}/delete")
    public void deleteAnimal(@PathVariable String id) {
        animalService.deleteAnimal(id);
    }

}