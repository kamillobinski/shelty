package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.MedicalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalDataRepository extends JpaRepository<MedicalData, Integer> {

    MedicalData findByAnimal(Animal animal);
    void deleteByAnimal(Animal animal);

}
