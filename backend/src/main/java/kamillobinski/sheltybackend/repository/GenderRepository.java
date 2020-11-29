package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenderRepository extends JpaRepository<Gender, Integer> {

    Gender findById(int id);
    List<Gender> findAll();

}
