package kamillobinski.sheltybackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PostCategoryTests {

    @Autowired
    private MockMvc mockMvc;

    private final int DEFAULT_CATEGORY_ID = 1;
    private final String DEFAULT_CATEGORY = "defaultCategory";
    private final String TEST_CATEGORY = "testCategory";

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/post-category"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Create_Post_Category() throws Exception {
        mockMvc.perform(post("/api/post-category/{category}/create", TEST_CATEGORY))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Post_Category() throws Exception {
        mockMvc.perform(get("/api/post-category/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].category").value(DEFAULT_CATEGORY));
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_Post_Category() throws Exception {
        mockMvc.perform(delete("/api/post-category/{id}/delete", DEFAULT_CATEGORY_ID))
                .andExpect(status().isOk());
    }

}
