package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BreedRepository extends JpaRepository<Breed, Integer> {

    List<Breed> findAll();

    List<Breed> findAllByOrderByBreedNameAsc();

    List<Breed> findAllBySpeciesId(int id);

    Breed findById(int id);

}
