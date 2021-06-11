package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.HouseTrained;
import kamillobinski.sheltybackend.entity.Species;
import kamillobinski.sheltybackend.service.SpeciesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/species")
public class SpeciesController {

    private final SpeciesService speciesService;

    public SpeciesController(SpeciesService speciesService) {
        this.speciesService = speciesService;
    }

    @GetMapping("/all")
    public List<Species> listAllSpecies() { return speciesService.getAllOptions(); }

    @PostMapping("/add")
    public void addSpecies(@RequestParam String speciesName) {
       speciesService.addSpecies(speciesName);
    }

    @DeleteMapping("/{id}/delete")
    public void deleteSpecies(@PathVariable String id) {
        speciesService.deleteSpecies(id);
    }

}
