package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.Images;
import kamillobinski.sheltybackend.repository.ImagesRepository;
import kamillobinski.sheltybackend.service.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/images")
public class ImagesController {

    @Autowired
    private ImagesService imagesService;

    @Autowired
    private ImagesRepository imagesRepository;

    @RequestMapping(value="/save/{animalId}", headers = "content-type=multipart/*", method = RequestMethod.POST)
    public void saveImage(@PathVariable String animalId, @RequestParam(value = "image") MultipartFile image) { imagesService.saveImage(animalId, image); }

    @RequestMapping(value="/fetch/all/{animalId}", method = RequestMethod.GET)
    public List<Images> getAllImagesForOneAnimal(@PathVariable String animalId) { return imagesService.getImages(animalId); }

    @RequestMapping(value="/delete/{imageId}", method = RequestMethod.GET)
    public void deleteImage(@PathVariable String imageId) throws IOException { imagesService.deleteImage(imageId); }

    @RequestMapping(value="/delete/all/{animalId}", method = RequestMethod.GET)
    public void deleteImages(@PathVariable String animalId) { imagesService.deleteImages(animalId); }

}
