package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.HouseTrained;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HouseTrainedRepository extends JpaRepository<HouseTrained, Integer> {

    List<HouseTrained> findAll();
    HouseTrained findById(int id);
    HouseTrained findByType(String type);

}
