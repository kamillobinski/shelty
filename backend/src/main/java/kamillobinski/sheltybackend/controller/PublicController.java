package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.*;
import kamillobinski.sheltybackend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private BreedService breedService;

    @Autowired
    private SpeciesService speciesService;

    @Autowired
    private PostService postService;

    @Autowired
    private ImagesService imagesService;

    @GetMapping("/animal/{id}/details")
    public Animal getAnimalDetails(@PathVariable String id) { return animalService.getAnimal(id); }

    @GetMapping("/animal/{id}/images")
    public List<Images> getAnimalImages(@PathVariable String id) { return imagesService.getImages(id); }

    @GetMapping("/animals/ready")
    public List<Animal> getReadyAnimals() { return animalService.getAllReadyForAdoptionAnimals(); }

    @GetMapping("/breeds/by/species")
    public List<Breed> getBreedsBySpecies(@RequestParam String id) {
        return breedService.getAllBreedsForSpecificSpecies(id);
    }

    @GetMapping("/breeds")
    public List<Breed> getBreeds() {
        return breedService.getAllBreeds();
    }

    @GetMapping("/species")
    public List<Species> getSpecies() {
        return speciesService.getAllOptions();
    }

    @GetMapping("/blog/posts")
    public List<Post> getPosts() { return postService.getAll(); }

}
