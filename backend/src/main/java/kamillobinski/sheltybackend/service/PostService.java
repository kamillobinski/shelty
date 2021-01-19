package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Post;
import kamillobinski.sheltybackend.entity.PostCategory;
import kamillobinski.sheltybackend.entity.User;
import kamillobinski.sheltybackend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class PostService {

    @Autowired
    public PostRepository postRepository;

    @Autowired
    public UserService userService;

    @Autowired
    public PostCategoryService postCategoryService;

    public Post get(String id) { return postRepository.findById(Integer.parseInt(id)); }

    public List<Post> getAll() { return postRepository.findAll(); }

    public Integer add(String title, String text, String date, String authorId) {
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

        Integer newPostId = getId(title, text);
        return newPostId;
    }

    public int getId(String title, String text) {
        return postRepository.findIdByTiTleAndText(title, text);
    }

    public void update(String id, String title, String text, String categoryId) {
        PostCategory category = new PostCategory();
        if(!categoryId.equals("DEFAULT") && !categoryId.equals("") ) {
            category = postCategoryService.getCategoryById(Integer.parseInt(categoryId));
        } else {
            category = null;
        }

        Post post = get(id);
        post.setTitle(title);
        post.setText(text);
        post.setCategory(category);
        postRepository.save(post);
    }

    public String addThumbnail(String id, MultipartFile image) {
        Post post = get(id);
        String previousThumbnail = post.getThumbnail();

        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyyHHmmss");
        Date date = new Date();
        String fileName = post.getId() + formatter.format(date) + "-avatar";
        String extension = "." + Objects.requireNonNull(image.getOriginalFilename()).substring(image.getOriginalFilename().lastIndexOf(".") + 1);

        Boolean isThumbnailUploaded = false;

        try {
            byte[] bytes = image.getBytes();
            Path path = Paths.get(new File("src/main/webapp/WEB-INF/images/post/thumbnail/" + fileName + extension).getAbsolutePath());
            Files.write(path, bytes);

            post.setThumbnail(fileName + extension);
            postRepository.save(post);

            isThumbnailUploaded = true;

            if(previousThumbnail != null) {
                Path previousPath = Paths.get(new File("src/main/webapp/WEB-INF/images/post/thumbnail/" + previousThumbnail).getAbsolutePath());
                Files.delete(previousPath);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        if(isThumbnailUploaded)
            return fileName + extension;
        else {
            return "error";
        }
    }

    public void deleteThumbnail(String id) {
        Post post = get(id);
        if(post.getThumbnail() != null) {
            Path pathToThumbnail = Paths.get(new File("src/main/webapp/WEB-INF/images/post/thumbnail/" + post.getThumbnail()).getAbsolutePath());
            try {
                Files.delete(pathToThumbnail);
                post.setThumbnail(null);
                postRepository.save(post);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void delete(String id) {
        Post post = get(id);
        deleteThumbnail(id);
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
