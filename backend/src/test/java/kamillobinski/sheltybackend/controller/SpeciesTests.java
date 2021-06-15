package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.repository.SpeciesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SpeciesTests {

    @Autowired
    private SpeciesRepository speciesRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/species"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Create_Species() throws Exception {
        mockMvc.perform(post("/api/species/create").param("speciesName", "testSpecies"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_Species() throws Exception {
        int id = speciesRepository.findBySpeciesName("testSpecies").getId();
        mockMvc.perform(delete("/api/species/{id}/delete", id))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Species() throws Exception {
        mockMvc.perform(get("/api/species/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].speciesName").value("dog"))
                .andExpect(jsonPath("$[1].speciesName").value("cat"));
    }

}
