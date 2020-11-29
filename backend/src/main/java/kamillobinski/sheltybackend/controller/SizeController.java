package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Size;
import kamillobinski.sheltybackend.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/size")
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping("/all")
    public List<Size> listAllSizes() { return sizeService.getAllSizes(); }
}
