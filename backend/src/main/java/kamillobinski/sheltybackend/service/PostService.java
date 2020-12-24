package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Post;
import kamillobinski.sheltybackend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    public PostRepository postRepository;

    public Post get(String id) { return postRepository.findById(Integer.parseInt(id)); }

    public List<Post> getAll() { return postRepository.findAll(); }

    public void add(String title, String text) {
        Post post = new Post();
        post.setTitle(title);
        post.setText(text);
        postRepository.save(post);
    }

    public void update(String id, String title, String text) {
        Post post = get(id);
        post.setTitle(title);
        post.setText(text);
        postRepository.save(post);
    }

    public void delete(String id) {
        Post post = get(id);
        postRepository.delete(post);
    }

}
