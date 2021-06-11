package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.User;
import kamillobinski.sheltybackend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.Path;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> listAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get/id/{username}")
    public int getUserId(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return user.getId();
    }

    @GetMapping("/{id}/data")
    public User getUser(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}/update")
    public void updateUser(@PathVariable String id, @RequestParam String username, @RequestParam(value = "firstName") String firstName, @RequestParam(value = "lastName") String lastName, @RequestParam String email, @RequestParam String password) {
        userService.updateUser(id, username, firstName, lastName, email, password);
    }

    @GetMapping("/{id}/avatar")
    public String listAnimalAvatar(@PathVariable String id) {
        return userService.getUserAvatar(id);
    }

    @PutMapping("/{id}/update-password")
    public Boolean updateUserPassword(@PathVariable String id, @RequestParam String oldPassword, @RequestParam String newPassword) {
        return userService.updatePassword(id, oldPassword, newPassword);
    }

    @PutMapping(value="/{id}/update-avatar" , headers = "content-type=multipart/*")
    public void updateAnimalAvatar(@PathVariable String id, @RequestParam(value = "image") MultipartFile image ) {
        userService.updateUserAvatar(id, image);
    }

    @DeleteMapping("/{id}/delete")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
