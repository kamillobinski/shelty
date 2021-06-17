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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PostTests {

    @Autowired
    private MockMvc mockMvc;

    private final int DEFAULT_POST_ID = 1;
    private final String DEFAULT_POST_TITLE = "defaultTitle";
    private final String DEFAULT_POST_TEXT = "defaultText";
    private final int DEFAULT_POST_AUTHOR = 1;
    private final int DEFAULT_POST_CATEGORY = 1;
    private final Long DEFAULT_POST_DATE = 1587420000000L;
    private final String DEFAULT_THUMBNAIL_PATH = "src/main/webapp/WEB-INF/images/animal/avatar/animal-avatar-default.jpg";

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/post"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Create_Post() throws Exception {
        mockMvc.perform(post("/api/post/create")
            .param("title", "testTitle")
            .param("text", "testText")
            .param("authorId", "1")
            .param("date", "2019-08-22"))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_Post() throws Exception {
        mockMvc.perform(put("/api/post/{id}/update", DEFAULT_POST_ID)
            .param("title", "testTitle")
            .param("text", "testText")
            .param("categoryId", "1"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Post() throws Exception {
        mockMvc.perform(get("/api/post/{id}", DEFAULT_POST_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.date").value(DEFAULT_POST_DATE))
                .andExpect(jsonPath("$.title").value(DEFAULT_POST_TITLE))
                .andExpect(jsonPath("$.text").value(DEFAULT_POST_TEXT))
                .andExpect(jsonPath("$.author.id").value(DEFAULT_POST_AUTHOR))
                .andExpect(jsonPath("$.category.id").value(DEFAULT_POST_CATEGORY));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Posts() throws Exception {
        mockMvc.perform(get("/api/post/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(DEFAULT_POST_TITLE))
                .andExpect(jsonPath("$[0].text").value(DEFAULT_POST_TEXT))
                .andExpect(jsonPath("$[0].author.id").value(DEFAULT_POST_AUTHOR))
                .andExpect(jsonPath("$[0].category.id").value(DEFAULT_POST_CATEGORY));
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_Post() throws Exception {
        mockMvc.perform(delete("/api/post/{id}/delete", DEFAULT_POST_ID))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Create_Post_Thumbnail() throws Exception {
        final InputStream inputStreamFirstImage = Thread.currentThread().getContextClassLoader().getResourceAsStream(DEFAULT_THUMBNAIL_PATH);
        MockMultipartFile mockMultipartFile = new MockMultipartFile("image.jpg", "image.jpg", "image/png", inputStreamFirstImage);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/post/{id}/create/thumbnail", DEFAULT_POST_ID)
                .file("image", mockMultipartFile.getBytes()))
                .andExpect(status().isOk());
    }

    /*
     * ToDo improve
     * Needs further testing
     * Can't delete previous thumbnail file
     */
    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_Post_Thumbnail() throws Exception {
        Should_Create_Post_Thumbnail();
        mockMvc.perform(delete("/api/post/{id}/delete/thumbnail", DEFAULT_POST_ID))
                .andExpect(status().isOk());
    }

}
