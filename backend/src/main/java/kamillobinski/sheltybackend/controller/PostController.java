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

    @PostMapping("/create")
    public Integer createPost(@RequestParam String title, @RequestParam String text, @RequestParam String authorId, @RequestParam String date) { return postService.add(title, text, date, authorId); }

    @PutMapping("/{id}/update")
    public void updatePost(@PathVariable String id, @RequestParam String title, @RequestParam String text, @RequestParam String categoryId) { postService.update(id, title, text, categoryId); }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable String id) { return postService.get(id); }

    @GetMapping("/all")
    public List<Post> getPosts() { return postService.getAll(); }

    @DeleteMapping("/{id}/delete")
    public void deletePost(@PathVariable String id) { postService.delete(id); }

    @PostMapping(value="/{id}/create/thumbnail" , headers = "content-type=multipart/*")
    public String createPostThumbnail(@PathVariable String id, @RequestParam(value = "image") MultipartFile image ) {
        return postService.addThumbnail(id, image);
    }

    @DeleteMapping(value="/{id}/delete/thumbnail")
    public void deletePostThumbnail(@PathVariable String id) {
        postService.deleteThumbnail(id);
    }

}
