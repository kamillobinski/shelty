package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Integer> {

    PostCategory findById(int id);

}
