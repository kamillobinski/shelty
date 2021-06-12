package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.CoatLength;
import kamillobinski.sheltybackend.service.CoatLengthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/coat-length")
public class CoatLengthController {

    @Autowired
    private CoatLengthService coatLengthService;

    @GetMapping("/all")
    public List<CoatLength> getCoatLengths() { return coatLengthService.getAllCoatLengths(); }
}
