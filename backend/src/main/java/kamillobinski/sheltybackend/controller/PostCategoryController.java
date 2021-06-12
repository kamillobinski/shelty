package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.PostCategory;
import kamillobinski.sheltybackend.service.PostCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/post-category")
public class PostCategoryController {

    @Autowired
    private PostCategoryService postCategoryService;

    @PostMapping(value="/{category}/create")
    public void createPostCategory(@PathVariable String category) { postCategoryService.addCategory(category); }

    @GetMapping(value="/all")
    public List<PostCategory> getPostCategories() { return postCategoryService.getAllCategories(); }

    @DeleteMapping(value="/{id}/delete")
    public void deletePostCategory(@PathVariable String id) { postCategoryService.deleteCategory(id); }
}
