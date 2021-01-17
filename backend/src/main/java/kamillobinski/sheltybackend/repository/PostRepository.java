package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    Post findById(int id);
    @Query("SELECT p.id FROM Post p WHERE p.title = ?1 AND p.text = ?2")
    Integer findIdByTiTleAndText(String title, String text);
    List<Post> findAll();

}
