package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.CoatLength;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoatLengthRepository extends JpaRepository<CoatLength, Integer> {

    List<CoatLength> findAll();
    CoatLength findById(int id);

}
