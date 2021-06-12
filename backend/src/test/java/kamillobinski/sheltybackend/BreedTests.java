package kamillobinski.sheltybackend;

import kamillobinski.sheltybackend.entity.Breed;
import kamillobinski.sheltybackend.entity.Species;
import kamillobinski.sheltybackend.repository.BreedRepository;
import kamillobinski.sheltybackend.repository.SpeciesRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@Rollback(false)
public class BreedTests {

    @Autowired
    private BreedRepository breedRepository;

    @Autowired
    private SpeciesRepository speciesRepository;

    @Test
    public void Should_Create_Species() {
        Species species = new Species();
        species.setSpeciesName("testSpecies");
        speciesRepository.save(species);
    }

    @Test
    public void Should_Create_Breed() {
        Breed breed = new Breed();
        breed.setBreedName("testBreed");
        breed.setSpecies(speciesRepository.findBySpeciesName("testSpecies"));
        breedRepository.save(breed);

        Assertions.assertNotNull(breedRepository.findByBreedName("testBreed"));
    }

    @Test
    public void Should_Delete_Breed() {
        Species species = speciesRepository.findBySpeciesName("testSpecies");
        speciesRepository.delete(species);

        Breed breed = breedRepository.findByBreedName("testBreed");
        breedRepository.delete(breed);

        Assertions.assertFalse(breedRepository.existsByBreedName("testBreed"));
    }

}
