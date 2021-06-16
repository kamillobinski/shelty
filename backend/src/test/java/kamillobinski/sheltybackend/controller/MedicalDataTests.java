package kamillobinski.sheltybackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MedicalDataTests {

    @Autowired
    private MockMvc mockMvc;

    private final int DEFAULT_ANIMAL_ID = 1;

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/medical-data"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Medical_Data() throws Exception {
        mockMvc.perform(get("/api/medical-data/{animalId}", DEFAULT_ANIMAL_ID))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("defaultText"));
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_Medical_Data() throws Exception {
        mockMvc.perform(put("/api/medical-data/{animalId}/update", DEFAULT_ANIMAL_ID)
                .param("graftingDate", "")
                .param("sterilizationDate", "")
                .param("dewormingDate", "")
                .param("description", "updateTest"))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_Medical_Data() throws Exception {
        mockMvc.perform(delete("/api/medical-data/{animalid}/delete", DEFAULT_ANIMAL_ID))
                .andExpect(status().isOk());
    }

}
