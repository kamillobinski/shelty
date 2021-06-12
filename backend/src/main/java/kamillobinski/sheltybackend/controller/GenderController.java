package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Gender;
import kamillobinski.sheltybackend.service.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/gender")
public class GenderController {

    @Autowired
    private GenderService genderService;

    @GetMapping("/all")
    public List<Gender> getGenders() { return  genderService.getAllGenders(); }

}
