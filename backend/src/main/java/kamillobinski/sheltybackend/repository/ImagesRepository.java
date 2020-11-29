package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ImagesRepository extends JpaRepository<Images, Integer> {

    List<Images> findAllByAnimal(Animal animal);
    Images findById(int id);
    Images deleteById(int id);
    void deleteAllByAnimal(Animal animal);


}