package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.HouseTrained;
import kamillobinski.sheltybackend.repository.HouseTrainedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HouseTrainedService {

    @Autowired
    HouseTrainedRepository houseTrainedRepository;

    public List<HouseTrained> getAllOptions() {
        return houseTrainedRepository.findAll();
    }

    public HouseTrained getHouseTrained(int id) {
        return houseTrainedRepository.findById(id);
    }

}
