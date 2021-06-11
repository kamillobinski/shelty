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

    @PostMapping(value="/save/{animalId}", headers = "content-type=multipart/*")
    public void saveImage(@PathVariable String animalId, @RequestParam(value = "image") MultipartFile image) { imagesService.saveImage(animalId, image); }

    @GetMapping(value="/fetch/all/{animalId}")
    public List<Images> getAllImagesForOneAnimal(@PathVariable String animalId) { return imagesService.getImages(animalId); }

    @DeleteMapping(value="/delete/{imageId}")
    public void deleteImage(@PathVariable String imageId) throws IOException { imagesService.deleteImage(imageId); }

    @DeleteMapping(value="/delete/all/{animalId}")
    public void deleteImages(@PathVariable String animalId) { imagesService.deleteImages(animalId); }

    @PutMapping(value="/set/avatar/{imageId}/{animalId}")
    public void setAvatarFromImage(@PathVariable String imageId, @PathVariable String animalId) throws IOException { imagesService.setAvatarFromImage(imageId, animalId); }

}
