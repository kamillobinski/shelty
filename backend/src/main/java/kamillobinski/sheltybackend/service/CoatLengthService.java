package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.CoatLength;
import kamillobinski.sheltybackend.repository.CoatLengthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoatLengthService {

    @Autowired
    private CoatLengthRepository coatLengthRepository;

    public List<CoatLength> getAllCoatLengths() {
        return coatLengthRepository.findAll();
    }

    public CoatLength getCoatLength(int id) {
        return coatLengthRepository.findById(id);
    }

}
