package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    Post findById(int id);

    List<Post> findAll();

}
