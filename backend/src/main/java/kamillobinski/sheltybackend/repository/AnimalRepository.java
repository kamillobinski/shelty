package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    List<Animal> findAll();
    Animal findById(int id);
    @Query("SELECT a.id FROM Animal a WHERE a.name = ?1")
    int findByName(String name);
    @Query("SELECT a.avatar FROM Animal a WHERE a.id = ?1")
    String getAnimalAvatar(int id);
    List<Animal> findAllByIsReady(boolean isReady);
    List<Animal> findByAgeBetween(int ageStart, int ageEnd);
    Animal findAnimalByName(String name);

}
