package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Species;
import kamillobinski.sheltybackend.repository.SpeciesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpeciesService {

    private final SpeciesRepository speciesRepository;

    public SpeciesService(SpeciesRepository speciesRepository) {
        this.speciesRepository = speciesRepository;
    }

    public List<Species> getAllOptions() {
        return speciesRepository.findAll();
    }

    public Species getSpecies(int id) {
        return speciesRepository.findById(id);
    }

    public void addSpecies(String name) {
        Species species = new Species();
        species.setSpeciesName(name);
        speciesRepository.save(species);
    }

    public void deleteSpecies(String id) {
        Species species = speciesRepository.findById(Integer.parseInt(id));
        speciesRepository.delete(species);
    }

}
