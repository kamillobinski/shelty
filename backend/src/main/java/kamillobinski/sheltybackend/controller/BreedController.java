package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Breed;
import kamillobinski.sheltybackend.service.BreedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/breed")
public class BreedController {

    @Autowired
    private BreedService breedService;

    @GetMapping("/all")
    public List<Breed> listAllBreeds(@RequestParam boolean sorted) {
        // Depending on the received parameter, the returned breed list
        // will be in the same order as in the database(sorted == false) or
        // sorted alphabetically based on the name of the breed(sorted == true).
        if(sorted) {
            return breedService.getAllBreedsWithSort();
        } else {
            return breedService.getAllBreeds();
        }
    }

    @PutMapping("/add")
    public void addBreed(@RequestParam String breedName, @RequestParam String speciesId) {
        breedService.addBreed(breedName, speciesId);
    }

    @DeleteMapping("/{breedId}/delete")
    public void deleteBreed(@PathVariable String breedId) {
        breedService.deleteBreed(breedId);
    }

}
