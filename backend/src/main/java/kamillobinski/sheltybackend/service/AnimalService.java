package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.Images;
import kamillobinski.sheltybackend.repository.AnimalRepository;
import kamillobinski.sheltybackend.repository.ImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class AnimalService {

    private final BreedService breedService;
    private final GenderService genderService;
    private final HouseTrainedService houseTrainedService;
    private final SizeService sizeService;
    private final CoatLengthService coatLengthService;
    private final AnimalRepository animalRepository;

    @Autowired
    private ImagesService imagesService;

    public AnimalService(BreedService breedService, GenderService genderService,
                         AnimalRepository animalRepository, HouseTrainedService houseTrainedService,
                         SizeService sizeService, CoatLengthService coatLengthService) {
        this.breedService = breedService;
        this.genderService = genderService;
        this.animalRepository = animalRepository;
        this.houseTrainedService = houseTrainedService;
        this.sizeService = sizeService;
        this.coatLengthService = coatLengthService;
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public List<Animal> getAllReadyForAdoptionAnimals() {
        return animalRepository.findAllByIsReady(true);
    }

    public Animal getAnimal(String id) {
        return animalRepository.findById(Integer.parseInt(id));
    }

    public int getAnimalId(String name) {return animalRepository.findByName(name);}

    public void updateAnimalName(String id, String name) {
        Animal animal = getAnimal(id);
        animal.setName(name);
        animalRepository.save(animal);
    }

    public void updateAnimal(String id, String name, String dateOfBirth, String age, String sizeId, String breedId,
                             String genderId, String color, String coatLengthId, String dateArrivedInShelter, String dateAdopted,
                             String identichip, String houseTrainedId, Boolean isReady, String comments) throws ParseException {
        Date dateOfBirth_sql = parseDate(dateOfBirth);
        Date dateArrivedInShelter_sql = parseDate(dateArrivedInShelter);
        Date dateAdopted_sql = parseDate(dateAdopted);

        // Find object based on id, perform changes and save updated.
        Animal animal = getAnimal(id);
        animal.setName(name);
        animal.setDateOfBirth(dateOfBirth_sql);
        animal.setAge(Integer.parseInt(age));
        animal.setSize(sizeService.getSize(Integer.parseInt(sizeId)));
        // Find a breed based on the received id and assign it to the animal.
        animal.setBreed(breedService.getBreed(Integer.parseInt(breedId)));
        // Find a gender based on the received id and assign it to the animal.
        animal.setGender(genderService.getGender(Integer.parseInt(genderId)));
        animal.setColor(checkIfEmptyString(color));
        animal.setCoatLength(coatLengthService.getCoatLength(Integer.parseInt(coatLengthId)));
        animal.setDateArrivedInShelter(dateArrivedInShelter_sql);
        animal.setDateAdopted(dateAdopted_sql);
        animal.setIdentichip(convertToBigInteger(checkIfEmptyString(identichip)));
        animal.setHouseTrained(houseTrainedService.getHouseTrained(Integer.parseInt(houseTrainedId)));
        animal.setReady(isReady);
        animal.setComments(comments);
        animalRepository.save(animal);
    }

    public void addAnimal(String name, String dateOfBirth, String age, String sizeId, String breedId, String genderId,
                          String color, String coatLengthId, String dateArrivedInShelter, String dateAdopted, String identichip,
                          String houseTrainedId, String comments, Boolean isReady) throws ParseException {
        Date dateOfBirth_sql = parseDate(dateOfBirth);
        Date dateArrivedInShelter_sql = parseDate(dateArrivedInShelter);
        Date dateAdopted_sql = parseDate(dateAdopted);

        // Create new object and save.
        Animal animal = new Animal();
        animal.setName(name);
        animal.setAvatar(setDefaultAvatar());
        animal.setDateOfBirth(dateOfBirth_sql);
        animal.setAge(Integer.parseInt(age));
        animal.setSize(sizeService.getSize(Integer.parseInt(sizeId)));
        animal.setBreed(breedService.getBreed(Integer.parseInt(breedId)));
        animal.setGender(genderService.getGender(Integer.parseInt(genderId)));
        animal.setColor(checkIfEmptyString(color));
        animal.setCoatLength(coatLengthService.getCoatLength(Integer.parseInt(coatLengthId)));
        animal.setDateArrivedInShelter(dateArrivedInShelter_sql);
        animal.setDateAdopted(dateAdopted_sql);
        animal.setIdentichip(convertToBigInteger(checkIfEmptyString(identichip)));
        animal.setHouseTrained(houseTrainedService.getHouseTrained(Integer.parseInt(houseTrainedId)));
        animal.setComments(checkIfEmptyString(comments));
        animal.setReady(isReady);
        animalRepository.save(animal);
    }

    public String setDefaultAvatar() {
        return "animal-avatar-default.jpg";
    }

    public String checkIfEmptyString(String param) {
        if (!param.equals("")) {
            return param;
        }
        return null;
    }

    public BigInteger convertToBigInteger(String param) {
        if (param != null) {
            return new BigInteger(param);
        } else return null;
    }

    public void deleteAnimal(String id) {
        Animal animal = getAnimal(id);
        String avatar = animal.getAvatar();
        try {
            if(!avatar.equals("animal-avatar-default.jpg")) {
                Path previousPath = Paths.get(new File("src/main/webapp/WEB-INF/images/avatars/" + avatar).getAbsolutePath());
                Files.delete(previousPath);
            }
        } catch (IOException exception) {
            exception.printStackTrace();
        }
        animalRepository.delete(animal);
    }

    public void updateAnimalAvatar(String id, MultipartFile image) {
        Animal animal = getAnimal(id);
        String previousAvatarName = animal.getAvatar();
        // Get and format current date to include in filename
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyyHHmmss");
        Date date = new Date();
        String fileName = animal.getName() + formatter.format(date) + "-avatar";
        // Get image extension
        String extension = "." + Objects.requireNonNull(image.getOriginalFilename()).substring(image.getOriginalFilename().lastIndexOf(".") + 1);

        try {
            byte[] bytes = image.getBytes();
            Path path = Paths.get(new File("src/main/webapp/WEB-INF/images/avatars/" + fileName + extension).getAbsolutePath());
            Files.write(path, bytes);
            // Attach image to animal
            animal.setAvatar(fileName + extension);
            animalRepository.save(animal);

            // Lastly delete previous avatar
            if (!previousAvatarName.equals("animal-avatar-default.jpg")) {
                Path previousPath = Paths.get(new File("src/main/webapp/WEB-INF/images/avatars/" + previousAvatarName).getAbsolutePath());
                Files.delete(previousPath);
            }
        } catch (IOException exception) {
            exception.printStackTrace();
        }
    }

    public String getAnimalAvatar(String id) {
        return animalRepository.getAnimalAvatar(Integer.parseInt(id));
    }

    // Parse date from string to java.sql.date
    public java.sql.Date parseDate(String date) throws ParseException {
        // Date format used when converting string to a date.
        SimpleDateFormat DATEFORMAT = new SimpleDateFormat("yyyy-MM-dd");

        // If the date value is not empty,
        // convert string to the date and return.
        if (!date.equals("")) {
            Date tempDateAdopted = DATEFORMAT.parse(date);
            return new java.sql.Date(tempDateAdopted.getTime());
        }
        return null;
    }

}
