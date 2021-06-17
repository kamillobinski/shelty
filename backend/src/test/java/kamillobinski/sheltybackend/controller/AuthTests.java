package kamillobinski.sheltybackend.controller;

import org.hamcrest.core.IsNull;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import com.jayway.jsonpath.JsonPath;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.transaction.annotation.Transactional;

import javax.json.Json;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthTests {

    @Autowired
    private MockMvc mockMvc;

    private final String DEFAULT_USERNAME = "admin";
    private final String DEFAULT_FIRSTNAME = "Admin";
    private final String DEFAULT_PASSWORD = "admin";
    private final String DEFAULT_EMAIL = "empty";
    private final String DEFAULT_ROLE = "ROLE_ADMIN";
    private final String DEFAULT_TOKEN_TYPE = "Bearer";

    private final String TEST_USERNAME = "testUsername";
    private final String TEST_PASSWORD = "testPassword";
    private final String TEST_FIRSTNAME = "testFirstname";
    private final String TEST_LASTNAME = "testLastname";
    private final String TEST_EMAIL = "testEmail";

    private final String SIGN_UP_SUCCESS_MESSAGE = "User registered successfully!";

    private String signInResult = "";

    private final String TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    @Test
    public MvcResult Should_Sign_In() throws Exception {
        JSONObject json = new JSONObject();
        json.put("username", DEFAULT_USERNAME);
        json.put("password", DEFAULT_PASSWORD);

        MvcResult mvcResult = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.valueOf(json)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
                .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRSTNAME))
                .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
                .andExpect(jsonPath("$.roles[0]").value(DEFAULT_ROLE))
                .andExpect(jsonPath("$.accessToken").value(IsNull.notNullValue()))
                .andExpect(jsonPath("$.tokenType").value(DEFAULT_TOKEN_TYPE))
                .andReturn();

        return mvcResult;
    }

    @Test
    @Transactional
    public void Should_Sign_Up() throws Exception {
        JSONObject json = new JSONObject();
        json.put("username", TEST_USERNAME);
        json.put("password", TEST_PASSWORD);
        json.put("firstName", TEST_FIRSTNAME);
        json.put("lastName", TEST_LASTNAME);
        json.put("email", TEST_EMAIL);

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.valueOf(json)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(SIGN_UP_SUCCESS_MESSAGE));
    }

    @Test
    public void Should_Return_Token_Is_Valid() throws Exception {
        MvcResult signInResult = Should_Sign_In();
        String response = signInResult.getResponse().getContentAsString();
        String accessToken = JsonPath.parse(response).read("$.accessToken");

        mockMvc.perform(post("/api/auth/validate/token")
                .param("token", accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    public void Should_Return_Token_Is_Invalid() throws Exception {
        mockMvc.perform(post("/api/auth/validate/token")
                .param("token", TEST_TOKEN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

}
