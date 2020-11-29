package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Species;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeciesRepository extends JpaRepository<Species, Integer> {

    Species findById(int id);
}
