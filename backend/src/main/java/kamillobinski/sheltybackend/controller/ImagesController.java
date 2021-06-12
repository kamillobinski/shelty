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

    @PostMapping(value="/{animalId}/save", headers = "content-type=multipart/*")
    public void saveImage(@PathVariable String animalId, @RequestParam(value = "image") MultipartFile image) { imagesService.saveImage(animalId, image); }

    @PutMapping(value="/{animalId}/{imageId}/set/avatar")
    public void setImageAsAvatar(@PathVariable String animalId, @PathVariable String imageId) throws IOException { imagesService.setAvatarFromImage(imageId, animalId); }

    @GetMapping(value="/fetch/all/{animalId}")
    public List<Images> getAllImagesForOneAnimal(@PathVariable String animalId) { return imagesService.getImages(animalId); }

    @DeleteMapping(value="/{imageId}/delete")
    public void deleteImage(@PathVariable String imageId) throws IOException { imagesService.deleteImage(imageId); }

    @DeleteMapping(value="/{animalId}/delete/all")
    public void deleteImages(@PathVariable String animalId) { imagesService.deleteImages(animalId); }

}
