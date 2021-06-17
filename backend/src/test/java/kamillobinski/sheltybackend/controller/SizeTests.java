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
public class SizeTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/size"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Sizes() throws Exception {
        mockMvc.perform(get("/api/size/all"))
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].type").value("small"))
                .andExpect(jsonPath("$[1].type").value("medium"))
                .andExpect(jsonPath("$[2].type").value("large"));
    }

}
