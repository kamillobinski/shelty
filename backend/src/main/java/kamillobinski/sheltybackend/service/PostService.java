package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Post;
import kamillobinski.sheltybackend.entity.User;
import kamillobinski.sheltybackend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PostService {

    @Autowired
    public PostRepository postRepository;

    @Autowired
    public UserService userService;

    public Post get(String id) { return postRepository.findById(Integer.parseInt(id)); }

    public List<Post> getAll() { return postRepository.findAll(); }

    public void add(String title, String text, String date, String authorId) {
        User author = userService.getUserById(authorId);

        Date date_sql = new Date();
        try {
            date_sql = parseDate(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Post post = new Post();
        post.setTitle(title);
        post.setText(text);
        post.setDate(date_sql);
        post.setAuthor(author);
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

    // Parse date from string to java.sql.date
    public java.sql.Date parseDate(String date) throws ParseException {
        // Date format used when converting string to a date.
        SimpleDateFormat DATEFORMAT = new SimpleDateFormat("yyyy-MM-dd");

        // If the date value is not empty,
        // convert string to the date and return.
        if (!date.equals("")) {
            Date tempDateAdopted = DATEFORMAT.parse(date);
            return new java.sql.Date(tempDateAdopted.getTime());
        }
        return null;
    }

}
