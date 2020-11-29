package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.HouseTrained;
import kamillobinski.sheltybackend.service.HouseTrainedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/house-trained")
public class HouseTrainedController {

    @Autowired
    private HouseTrainedService houseTrainedService;

    @GetMapping("/all")
    public List<HouseTrained> listAllHouseTrainedOptions() { return houseTrainedService.getAllOptions(); }

}
