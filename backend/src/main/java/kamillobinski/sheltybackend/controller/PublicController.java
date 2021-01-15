package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.Breed;
import kamillobinski.sheltybackend.entity.Post;
import kamillobinski.sheltybackend.entity.Species;
import kamillobinski.sheltybackend.service.AnimalService;
import kamillobinski.sheltybackend.service.BreedService;
import kamillobinski.sheltybackend.service.PostService;
import kamillobinski.sheltybackend.service.SpeciesService;
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

}
