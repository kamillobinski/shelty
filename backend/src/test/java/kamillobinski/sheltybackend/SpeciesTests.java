package kamillobinski.sheltybackend;

import kamillobinski.sheltybackend.entity.Species;
import kamillobinski.sheltybackend.repository.SpeciesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@Rollback(false)
public class SpeciesTests {

    @Autowired
    private SpeciesRepository speciesRepository;

    @Test
    public void Should_Create_Species() {
        Species species = new Species();
        species.setSpeciesName("testSpecies");
        speciesRepository.save(species);
    }

    @Test
    public void Should_Delete_Species() {
        Species species = speciesRepository.findBySpeciesName("testSpecies");
        speciesRepository.delete(species);
    }

}
