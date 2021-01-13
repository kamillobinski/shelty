package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Integer> {

    List<MedicalHistory> findAllByAnimal(Animal animal);
    MedicalHistory findById(int id);
    MedicalHistory deleteById(int id);

}
