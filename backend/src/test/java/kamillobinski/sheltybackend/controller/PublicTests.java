package kamillobinski.sheltybackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PublicTests {

    @Autowired
    private MockMvc mockMvc;

    private final int DEFAULT_ANIMAL_ID = 1;
    private final String DEFAULT_ANIMAL_NAME = "defaultAnimal";
    private final String DEFAULT_ANIMAL_AVATAR = "animal-avatar-default.jpg";
    private final String DEFAULT_ANIMAL_IMAGE = "default_image.jpg";
    private final int DEFAULT_ANIMAL_AGE = 2;
    private final String DEFAULT_ANIMAL_SIZE = "small";
    private final String DEFAULT_ANIMAL_COATLENGTH = "short";
    private final String DEFAULT_ANIMAL_BREED = "Shih Tzu";
    private final String DEFAULT_ANIMAL_GENDER = "male";
    private final String DEFAULT_ANIMAL_HOUSETRAINED = "yes";
    private final String DEFAULT_ANIMAL_COMMENT = "defaultText";
    private final boolean DEFAULT_ANIMAL_READY = true;

    private final String DEFAULT_BREED_1 ="Shih Tzu";
    private final String DEFAULT_BREED_2 = "PitBull Terrier";

    private final String DEFAULT_SPECIES_1 = "dog";
    private final String DEFAULT_SPECIES_2 = "cat";

    private final String DEFAULT_POST_TITLE = "defaultTitle";
    private final String DEFAULT_POST_TEXT = "defaultText";

    @Test
    public void Should_Return_Ok_Status_For_Unauthorized_User() throws Exception {
        mockMvc.perform(get("/api/public/animals/ready"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Return_Ok_Status_For_Admin() throws Exception {
        mockMvc.perform(get("/api/public/animals/ready"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Animal() throws Exception {
        mockMvc.perform(get("/api/public/animal/{id}/details", DEFAULT_ANIMAL_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(DEFAULT_ANIMAL_NAME))
                .andExpect(jsonPath("$.avatar").value(DEFAULT_ANIMAL_AVATAR))
                .andExpect(jsonPath("$.age").value(DEFAULT_ANIMAL_AGE))
                .andExpect(jsonPath("$.size.type").value(DEFAULT_ANIMAL_SIZE))
                .andExpect(jsonPath("$.coatLength.type").value(DEFAULT_ANIMAL_COATLENGTH))
                .andExpect(jsonPath("$.breed.breedName").value(DEFAULT_ANIMAL_BREED))
                .andExpect(jsonPath("$.gender.type").value(DEFAULT_ANIMAL_GENDER))
                .andExpect(jsonPath("$.houseTrained.type").value(DEFAULT_ANIMAL_HOUSETRAINED))
                .andExpect(jsonPath("$.comments").value(DEFAULT_ANIMAL_COMMENT))
                .andExpect(jsonPath("$.ready").value(DEFAULT_ANIMAL_READY));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Animal_Images() throws Exception {
        mockMvc.perform(get("/api/public/animal/{id}/images", DEFAULT_ANIMAL_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].url").value(DEFAULT_ANIMAL_IMAGE));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Ready_Animals() throws Exception {
        mockMvc.perform(get("/api/public/animals/ready"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value(DEFAULT_ANIMAL_NAME));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Dog_Breeds() throws Exception {
        mockMvc.perform(get("/api/public/breeds/by/species")
                .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].breedName").value(DEFAULT_BREED_1))
                .andExpect(jsonPath("$[1].breedName").value(DEFAULT_BREED_2));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Breeds() throws Exception {
        mockMvc.perform(get("/api/public/breeds"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].breedName").value(DEFAULT_BREED_1))
                .andExpect(jsonPath("$[1].breedName").value(DEFAULT_BREED_2));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Species() throws Exception {
        mockMvc.perform(get("/api/public/species"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].speciesName").value(DEFAULT_SPECIES_1))
                .andExpect(jsonPath("$[1].speciesName").value(DEFAULT_SPECIES_2));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Blog_Posts() throws Exception {
        mockMvc.perform(get("/api/public/blog/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value(DEFAULT_POST_TITLE))
                .andExpect(jsonPath("$[0].text").value(DEFAULT_POST_TEXT));
    }

}
