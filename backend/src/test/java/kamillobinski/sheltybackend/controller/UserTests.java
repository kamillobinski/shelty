package kamillobinski.sheltybackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserTests {

    @Autowired
    private MockMvc mockMvc;

    private final int DEFAULT_USER_ID = 1;
    private final String DEFAULT_USER_AVATAR = "user-avatar-default.jpg";
    private final String DEFAULT_USER_EMAIL = "empty";
    private final String DEFAULT_USER_FIRSTNAME = "Admin";
    private final String DEFAULT_USER_LASTNAME = "";
    private final String DEFAULT_USER_PASSWORD = "$2y$10$LrPlYkiJcKh./4rv3UNIbeXbEvXAB5hjyf.Du7Rh1MR8PIAa0.YGi";
    private final String DEFAULT_USER_PASSWORD_DECRYPTED = "admin";
    private final String DEFAULT_USER_USERNAME = "admin";

    private final String TEST_USER_AVATAR = "user-avatar-default.jpg";
    private final String TEST_USER_EMAIL = "empty";
    private final String TEST_USER_FIRSTNAME = "testFirstname";
    private final String TEST_USER_LASTNAME = "testLastname";
    private final String TEST_USER_PASSWORD = "$2y$10$ojAWZVIPQTtuGLjvGiybUey8p5nlEoQJB8Ar4AXSgS12X5Kq7PcHi ";
    private final String TEST_USER_PASSWORD_DECRYPTED = "testPassword";
    private final String TEST_USER_USERNAME = "testUsername";

    private final String DEFAULT_AVATAR_PATH = "src/main/webapp/WEB-INF/images/user/avatar/user-avatar-default.jpg";

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/user"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_User() throws Exception {
        mockMvc.perform(put("/api/user/{id}/update", DEFAULT_USER_ID)
                .param("username", TEST_USER_USERNAME)
                .param("firstName", TEST_USER_FIRSTNAME)
                .param("lastName", TEST_USER_LASTNAME)
                .param("email", TEST_USER_EMAIL)
                .param("password", TEST_USER_PASSWORD_DECRYPTED))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_User_Password() throws Exception {
        mockMvc.perform(put("/api/user/{id}/update/password", DEFAULT_USER_ID)
                .param("oldPassword", DEFAULT_USER_PASSWORD_DECRYPTED)
                .param("newPassword", TEST_USER_PASSWORD_DECRYPTED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Throw_False_For_Wrong_Old_Password() throws Exception {
        mockMvc.perform(put("/api/user/{id}/update/password", DEFAULT_USER_ID)
                .param("oldPassword", "password")
                .param("newPassword", TEST_USER_PASSWORD_DECRYPTED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

    /*
     * ToDo improve
     * - needs further testing
     * - missing image extension
     */
    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_User_Avatar() throws Exception {
        final InputStream inputStreamFirstImage = Thread.currentThread().getContextClassLoader().getResourceAsStream(DEFAULT_AVATAR_PATH);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("image.jpg", "image.jpg", "image/png", inputStreamFirstImage);

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/user/{id}/update/avatar", DEFAULT_USER_ID)
                .file("image", mockMultipartFile.getBytes()))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_User() throws Exception {
        mockMvc.perform(get("/api/user/{id}", DEFAULT_USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(DEFAULT_USER_USERNAME))
                .andExpect(jsonPath("$.avatar").value(DEFAULT_USER_AVATAR))
                .andExpect(jsonPath("$.email").value(DEFAULT_USER_EMAIL))
                .andExpect(jsonPath("$.firstName").value(DEFAULT_USER_FIRSTNAME))
                .andExpect(jsonPath("$.lastName").value(DEFAULT_USER_LASTNAME))
                .andExpect(jsonPath("$.password").value(DEFAULT_USER_PASSWORD));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_User_Id() throws Exception {
        mockMvc.perform(get("/api/user/{username}/id", DEFAULT_USER_USERNAME))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(DEFAULT_USER_ID));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_User_Avatar() throws Exception {
        mockMvc.perform(get("/api/user/{ud}/avatar", DEFAULT_USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(DEFAULT_USER_AVATAR));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Users() throws Exception {
        mockMvc.perform(get("/api/user/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].username").value(DEFAULT_USER_USERNAME))
                .andExpect(jsonPath("$[0].avatar").value(DEFAULT_USER_AVATAR))
                .andExpect(jsonPath("$[0].email").value(DEFAULT_USER_EMAIL))
                .andExpect(jsonPath("$[0].firstName").value(DEFAULT_USER_FIRSTNAME))
                .andExpect(jsonPath("$[0].lastName").value(DEFAULT_USER_LASTNAME))
                .andExpect(jsonPath("$[0].password").value(DEFAULT_USER_PASSWORD));;
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_User() throws Exception {
        mockMvc.perform(delete("/api/user/{id}/delete", DEFAULT_USER_ID))
                .andExpect(status().isOk());
    }

}
