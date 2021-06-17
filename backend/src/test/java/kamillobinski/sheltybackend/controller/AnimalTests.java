package kamillobinski.sheltybackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AnimalTests {

    @Autowired
    private MockMvc mockMvc;

    private final String TEST_ANIMAL_NAME = "testAnimal";
    private final String TEST_ANIMAL_DATEOFBIRTH = "2020-05-24";
    private final String TEST_ANIMAL_AGE = "2";
    private final String TEST_ANIMAL_SIZE_ID = "1";
    private final String TEST_ANIMAL_BREED_ID = "1";
    private final String TEST_ANIMAL_GENDER_ID = "1";
    private final String TEST_ANIMAL_COLOR = "black";
    private final String TEST_ANIMAL_COATLENGTH_ID = "1";
    private final String TEST_ANIMAL_DATEARRIVEDINSHELTER = "2021-02-13";
    private final String TEST_ANIMAL_DATEADOPTED = "";
    private final String TEST_ANIMAL_IDENTICHIP = "12213124214";
    private final String TEST_ANIMAL_HOUSETRAINED_ID = "1";
    private final String TEST_ANIMAL_COMMENTS = "test comment";
    private final String TEST_ANIMAL_ISREADY = "true";

    private final int DEFAULT_ANIMAL_ID = 1;
    private final String DEFAULT_ANIMAL_NAME = "defaultAnimal";
    private final String DEFAULT_ANIMAL_AVATAR = "animal-avatar-default.jpg";

    private final int DEFAULT_ANIMAL_LIST_SIZE = 1;


    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Create_Animal() throws Exception {
        mockMvc.perform(post("/api/animal/create")
                .param("name", TEST_ANIMAL_NAME)
                .param("dateOfBirth", TEST_ANIMAL_DATEOFBIRTH)
                .param("age", TEST_ANIMAL_AGE)
                .param("size", TEST_ANIMAL_SIZE_ID)
                .param("breed", TEST_ANIMAL_BREED_ID)
                .param("gender", TEST_ANIMAL_GENDER_ID)
                .param("color", TEST_ANIMAL_COLOR)
                .param("coatLength", TEST_ANIMAL_COATLENGTH_ID)
                .param("dateArrivedInShelter", TEST_ANIMAL_DATEARRIVEDINSHELTER)
                .param("dateAdopted", TEST_ANIMAL_DATEADOPTED)
                .param("identichip", TEST_ANIMAL_IDENTICHIP)
                .param("houseTrained", TEST_ANIMAL_HOUSETRAINED_ID)
                .param("comments", TEST_ANIMAL_COMMENTS)
                .param("isReady", TEST_ANIMAL_ISREADY))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Animal() throws Exception {
        mockMvc.perform(get("/api/animal/{id}", DEFAULT_ANIMAL_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(DEFAULT_ANIMAL_NAME))
                .andExpect(jsonPath("$.avatar").value(DEFAULT_ANIMAL_AVATAR));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Animal_Id() throws Exception {
        mockMvc.perform(get("/api/animal/{name}/id", DEFAULT_ANIMAL_NAME))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(DEFAULT_ANIMAL_ID));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Animals() throws Exception {
        mockMvc.perform(get("/api/animal/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(DEFAULT_ANIMAL_LIST_SIZE)));
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_Animal() throws Exception {
        mockMvc.perform(put("/api/animal/{id}/update", DEFAULT_ANIMAL_ID)
                .param("name", TEST_ANIMAL_NAME)
                .param("dateOfBirth", TEST_ANIMAL_DATEOFBIRTH)
                .param("age", TEST_ANIMAL_AGE)
                .param("size", TEST_ANIMAL_SIZE_ID)
                .param("breed", TEST_ANIMAL_BREED_ID)
                .param("gender", TEST_ANIMAL_GENDER_ID)
                .param("color", TEST_ANIMAL_COLOR)
                .param("coatLength", TEST_ANIMAL_COATLENGTH_ID)
                .param("dateArrivedInShelter", TEST_ANIMAL_DATEARRIVEDINSHELTER)
                .param("dateAdopted", TEST_ANIMAL_DATEADOPTED)
                .param("identichip", TEST_ANIMAL_IDENTICHIP)
                .param("houseTrained", TEST_ANIMAL_HOUSETRAINED_ID)
                .param("comments", TEST_ANIMAL_COMMENTS)
                .param("isReady", TEST_ANIMAL_ISREADY))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_Animal() throws Exception {
        mockMvc.perform(delete("/api/animal/{id}/delete", DEFAULT_ANIMAL_ID))
                .andExpect(status().isOk());
    }

}
