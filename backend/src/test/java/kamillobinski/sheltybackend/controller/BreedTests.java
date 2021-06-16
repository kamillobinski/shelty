package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Breed;
import kamillobinski.sheltybackend.repository.BreedRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BreedTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BreedRepository breedRepository;

    private final String breedName = "testBreed";

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/breed"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Create_Breed() throws Exception {
        mockMvc.perform(post("/api/breed/create").param("breedName", breedName).param("speciesId", "1"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_Breed() throws Exception {
        Breed breed = breedRepository.findByBreedName(breedName);
        mockMvc.perform(delete("/api/breed/{breedId}/delete", breed.getId()))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Breeds() throws Exception {
        mockMvc.perform(get("/api/breed/all").param("sorted", "false"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].breedName").value("Shih Tzu"));
    }

}
