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

    @GetMapping("/animals/latest")
    public List<Animal> listAllAnimals() { return animalService.getAllReadyForAdoptionAnimals(); }

    // TODO: send only valuable info
    @GetMapping("/animal/{id}/details")
    public Animal listAnimalDetails(@PathVariable String id) { return animalService.getAnimal(id); }

    @GetMapping("/get/specific/breeds")
    public List<Breed> listAllBreedsForSpecificSpecies(@RequestParam String id) {
        return breedService.getAllBreedsForSpecificSpecies(id);
    }

    @GetMapping("/get/breeds")
    public List<Breed> listAllBreeds() {
        return breedService.getAllBreeds();
    }

    @GetMapping("/get/species")
    public List<Species> listAllSpecies() {
        return speciesService.getAllOptions();
    }

    @GetMapping("/get/blog/posts")
    public List<Post> listAllPosts() { return postService.getAll(); }

    @GetMapping("/get/animal/{id}/gallery")
    public List<Images> listAllGalleryImages(@PathVariable String id) { return imagesService.getImages(id); }

}
