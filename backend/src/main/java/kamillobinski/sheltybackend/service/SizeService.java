package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Size;
import kamillobinski.sheltybackend.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    public List<Size> getAllSizes() {
        return sizeRepository.findAll();
    }

    public Size getSize(int id) {
        return sizeRepository.findById(id);
    }
}
