package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.PostCategory;
import kamillobinski.sheltybackend.service.PostCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/post/category")
public class PostCategoryController {

    @Autowired
    private PostCategoryService postCategoryService;

    @RequestMapping(value="/add/{category}", method = RequestMethod.POST)
    public void addPostCategory(@PathVariable String category) { postCategoryService.addCategory(category); }

    @RequestMapping(value="/get/all", method = RequestMethod.GET)
    public List<PostCategory> getAllPostCategories() { return postCategoryService.getAllCategories(); }

    @RequestMapping(value="/delete/{id}", method = RequestMethod.DELETE)
    public void deletePostCategory(@PathVariable String id) { postCategoryService.deleteCategory(id); }
}
