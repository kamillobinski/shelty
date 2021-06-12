package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Integer> {

    List<Size> findAll();
    Size findById(int id);
    Size findByType(String type);
    void deleteByType(String type);
    boolean existsByType(String type);

}
