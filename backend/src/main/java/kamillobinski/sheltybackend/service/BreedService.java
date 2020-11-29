package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Breed;
import kamillobinski.sheltybackend.entity.Species;
import kamillobinski.sheltybackend.repository.BreedRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreedService {

    private final BreedRepository breedRepository;
    private final SpeciesService speciesService;

    public BreedService(BreedRepository breedRepository, SpeciesService speciesService) {
        this.breedRepository = breedRepository;
        this.speciesService = speciesService;
    }

    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    public List<Breed> getAllBreedsWithSort() {
        return breedRepository.findAllByOrderByBreedNameAsc();
    }

    public List<Breed> getAllBreedsForSpecificSpecies(String id) { return breedRepository.findAllBySpeciesId(Integer.parseInt(id)); }

    public Breed getBreed(int id) {
        return breedRepository.findById(id);
    }

    public void addBreed(String breedName, String speciesId) {
        Breed newBreed = new Breed();
        newBreed.setBreedName(breedName);
        Species reqSpecies = speciesService.getSpecies(Integer.parseInt(speciesId));
        newBreed.setSpecies(reqSpecies);
        breedRepository.save(newBreed);
    }

    public void deleteBreed(String breedId) {
        Breed breed = breedRepository.findById(Integer.parseInt(breedId));
        breedRepository.delete(breed);
    }

}
