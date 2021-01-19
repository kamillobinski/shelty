package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Post;
import kamillobinski.sheltybackend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public void updatePost(@PathVariable String id, @RequestParam String title, @RequestParam String text, @RequestParam String categoryId) { postService.update(id, title, text, categoryId); }

    @RequestMapping(value="/{id}/add/thumbnail" , headers = "content-type=multipart/*", method = RequestMethod.POST)
    public String addPostThumbnail(@PathVariable String id, @RequestParam(value = "image") MultipartFile image ) {
        return postService.addThumbnail(id, image);
    }

    @RequestMapping(value="/{id}/delete/thumbnail", method = RequestMethod.DELETE)
    public void deletePostThumbnail(@PathVariable String id) {
        postService.deleteThumbnail(id);
    }

    @GetMapping("/delete/{id}")
    public void deletePost(@PathVariable String id) { postService.delete(id); }

}
