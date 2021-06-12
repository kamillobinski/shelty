package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Species;
import kamillobinski.sheltybackend.service.SpeciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/species")
public class SpeciesController {

    @Autowired
    private SpeciesService speciesService;

    @PostMapping("/create")
    public void createSpecies(@RequestParam String speciesName) {
        speciesService.addSpecies(speciesName);
    }

    @GetMapping("/all")
    public List<Species> getSpecies() { return speciesService.getAllOptions(); }

    @DeleteMapping("/{id}/delete")
    public void deleteSpecies(@PathVariable String id) {
        speciesService.deleteSpecies(id);
    }

}
