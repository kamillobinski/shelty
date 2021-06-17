package kamillobinski.sheltybackend.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void Should_Throw_Unauthorized_Error() throws Exception {
        mockMvc.perform(get("/api/user"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_User() {

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_User_Password() {

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Update_User_Avatar() {

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_User() {

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_User_Id() {

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_User_Avatar() {

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Get_All_Users() {

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void Should_Delete_User() {

    }

}
