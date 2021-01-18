package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.PostCategory;
import kamillobinski.sheltybackend.repository.PostCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostCategoryService {

    @Autowired
    private PostCategoryRepository postCategoryRepository;

    public PostCategory getCategoryById (int id) {
        return postCategoryRepository.findById(id);
    }

    public void addCategory(String category) {
        PostCategory newPostCategory = new PostCategory();
        newPostCategory.setCategory(category);
        postCategoryRepository.save(newPostCategory);
    }

    public List<PostCategory> getAllCategories() {
        return postCategoryRepository.findAll();
    }

    public void deleteCategory(String id) {
        PostCategory postCategory = getCategoryById(Integer.parseInt(id));
        postCategoryRepository.delete(postCategory);
    }

}
