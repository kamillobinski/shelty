package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Gender;
import kamillobinski.sheltybackend.repository.GenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenderService {

    @Autowired
    private GenderRepository genderRepository;

    public List<Gender> getAllGenders() { return genderRepository.findAll(); }

    public Gender getGender(int id) { return genderRepository.findById(id); }

}
