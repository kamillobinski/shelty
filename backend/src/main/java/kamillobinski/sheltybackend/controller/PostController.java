package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Post;
import kamillobinski.sheltybackend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    public PostService postService;

    @GetMapping("/get/{id}")
    public Post getPost(@PathVariable String id) { return postService.get(id); }

    @GetMapping("/get/all")
    public List<Post> getPosts() { return postService.getAll(); }

    @GetMapping("/add")
    public Integer addPost(@RequestParam String title, @RequestParam String text, @RequestParam String authorId, @RequestParam String date) { return postService.add(title, text, date, authorId); }

    @GetMapping("/update/{id}")
    public void updatePost(@PathVariable String id, @RequestParam String title, @RequestParam String text) { postService.update(id, title, text); }

    @GetMapping("/delete/{id}")
    public void deletePost(@PathVariable String id) { postService.delete(id); }

}
