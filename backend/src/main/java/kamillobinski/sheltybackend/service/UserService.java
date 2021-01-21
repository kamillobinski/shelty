package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.ERole;
import kamillobinski.sheltybackend.entity.Role;
import kamillobinski.sheltybackend.entity.User;
import kamillobinski.sheltybackend.repository.RoleRepository;
import kamillobinski.sheltybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder PasswordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(Integer.parseInt(id)).orElseThrow(() -> new RuntimeException("Error: User is not found."));
    }

    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public void addUser(String username, String first_name, String last_name, String email, String password) {
        Set<Role> roles = new HashSet<>();
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);
        roles.add(adminRole);

        User user = new User();
        user.setUsername(username);
        user.setFirstName(first_name);
        user.setLastName(last_name);
        user.setEmail(email);
        user.setPassword(PasswordEncoder.encode(password));
        user.setRoles(roles);
        userRepository.save(user);
    }

    public void updateUser(String id, String username, String first_name, String last_name, String email, String password) {
        User user = getUserById(id);
        System.out.println(user.getEmail());
        user.setUsername(username);
        user.setFirstName(first_name);
        user.setLastName(last_name);
        user.setEmail(email);
        if(!(password.equals(""))) {
            user.setPassword(PasswordEncoder.encode(password));
        }
        userRepository.save(user);
    }

    public String getUserAvatar(String id) {
        return userRepository.getUserAvatar(Integer.parseInt(id));
    }

    public void updateUserAvatar(String id, MultipartFile image) {
        User user = getUserById(id);
        String previousAvatarName = user.getAvatar();
        // Get and format current date to include in filename
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyyHHmmss");
        Date date = new Date();
        String fileName = user.getUsername() + formatter.format(date) + "-avatar";
        // Get image extension
        String extension = "." + Objects.requireNonNull(image.getOriginalFilename()).substring(image.getOriginalFilename().lastIndexOf(".") + 1);

        try {
            byte[] bytes = image.getBytes();
            Path path = Paths.get(new File("src/main/webapp/WEB-INF/images/user/avatar/" + fileName + extension).getAbsolutePath());
            Files.write(path, bytes);
            // Attach image to animal
            user.setAvatar(fileName + extension);
            userRepository.save(user);

            // Lastly delete previous avatar
            if (!previousAvatarName.equals("user-avatar-default.jpg")) {
                Path previousPath = Paths.get(new File("src/main/webapp/WEB-INF/images/user/avatar/" + previousAvatarName).getAbsolutePath());
                Files.delete(previousPath);
            }
        } catch (IOException exception) {
            exception.printStackTrace();
        }
    }

    public void deleteUser(String id) {
        User user = getUserById(id);
        String curretUserAvatar = user.getAvatar();
        user.setRoles(null);

        // Delete avatar
        if (!curretUserAvatar.equals("user-avatar-default.jpg")) {
            Path avatarPath = Paths.get(new File("src/main/webapp/WEB-INF/images/user/avatar/" + curretUserAvatar).getAbsolutePath());
            try {
                Files.delete(avatarPath);
            } catch (IOException exception) {
                exception.printStackTrace();
            }
        }
        userRepository.delete(user);
    }

    public Boolean updatePassword(String id, String oldPassword, String newPassword) {
        User user = getUserById(id);

        if(PasswordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(PasswordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }

}
