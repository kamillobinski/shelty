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
public class MedicalHistoryTests {

    @Autowired
    private MockMvc mockMvc;

    private final int DEFAULT_ANIMAL_ID = 1;
    private final int DEFAULT_MEDICAL_HISTORY_ID = 1;

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/medical-history"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Create_Medical_History() throws Exception {
        mockMvc.perform(post("/api/medical-history/{animalId}/create", DEFAULT_ANIMAL_ID)
                .param("type", "testType")
                .param("medicine", "testmedicine")
                .param("vet", "testVet")
                .param("date", "2020-04-15")
                .param("isCompleted", "true"))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_Medical_History_Status() throws Exception {
        mockMvc.perform(put("/api/medical-history/{medicalHistoryid}/update/status", DEFAULT_MEDICAL_HISTORY_ID)
                .param("status", "false"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_Medical_History() throws Exception {
        mockMvc.perform(get("/api/medical-history/{animalId}", DEFAULT_ANIMAL_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].date").value("1624485600000"))
                .andExpect(jsonPath("$[0].completed").value(true))
                .andExpect(jsonPath("$[0].medicine").value("defaultMedicine"))
                .andExpect(jsonPath("$[0].type").value("defaultType"))
                .andExpect(jsonPath("$[0].vet").value("defaultVet"))
                .andExpect(jsonPath("$[1].date").value("1623276000000"))
                .andExpect(jsonPath("$[1].completed").value(false))
                .andExpect(jsonPath("$[1].medicine").value("defaultMedicine"))
                .andExpect(jsonPath("$[1].type").value("defaultType"))
                .andExpect(jsonPath("$[1].vet").value("defaultVet"));
    }

    @Test
    @Transactional
    @WithMockUser
    public void Should_Delete_Medical_History() throws Exception {
        mockMvc.perform(delete("/api/medical-history/{medicalHistoryId}/delete", DEFAULT_MEDICAL_HISTORY_ID))
                .andExpect(status().isOk());
    }

}
