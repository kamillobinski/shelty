package kamillobinski.sheltybackend;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.CoatLength;
import kamillobinski.sheltybackend.entity.HouseTrained;
import kamillobinski.sheltybackend.entity.MedicalHistory;
import kamillobinski.sheltybackend.repository.*;
import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Transactional
@SpringBootTest
public class MedicalHistoryTests {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private BreedRepository breedRepository;

    @Autowired
    private GenderRepository genderRepository;

    @Autowired
    private CoatLengthRepository coatLengthRepository;

    @Autowired
    private HouseTrainedRepository houseTrainedRepository;

    @BeforeEach
    @Rollback(false)
    public void before() {
        Animal animal = new Animal();
        animal.setName("Test");
        animal.setAge(2);
        animal.setSize(sizeRepository.findByType("small"));
        animal.setBreed(breedRepository.findByBreedName("Amstaff"));
        animal.setGender(genderRepository.findByType("male"));
        animal.setCoatLength(coatLengthRepository.findByType("short"));
        animal.setHouseTrained(houseTrainedRepository.findByType("yes"));
        animal.setReady(true);
        animalRepository.save(animal);
    }

    @Test
    public void Should_Create_Medical_History_For_Specific_Animal() throws ParseException {
        String dateAsString = "22-10-2010";
        DateFormat format = new SimpleDateFormat("dd-MM-YYYY");
        Date date = format.parse(dateAsString);

        Animal testAnimal = animalRepository.findAnimalByName("Test");

        MedicalHistory medicalHistory = new MedicalHistory();
        medicalHistory.setAnimal(testAnimal);
        medicalHistory.setMedicine("testMedicine");
        medicalHistory.setType("testType");
        medicalHistory.setVet("testVet");
        medicalHistory.setCompleted(true);
        medicalHistory.setDate(date);
        medicalHistoryRepository.save(medicalHistory);

        Assertions.assertNotNull(testAnimal);
    }

    @Test
    public void Should_Update_Medical_History_Status_For_Specific_Animal() throws ParseException {
        Should_Create_Medical_History_For_Specific_Animal();

        MedicalHistory medicalHistory = medicalHistoryRepository.findByAnimalName("Test");
        medicalHistory.setCompleted(false);
        medicalHistoryRepository.save(medicalHistory);

        MedicalHistory medicalHistoryUpdated = medicalHistoryRepository.findByAnimalName("Test");
        Assertions.assertFalse(medicalHistoryUpdated.getCompleted());
    }

    @Test
    public void Should_Delete_Medical_History_For_Specific_Animal() throws ParseException {
        Should_Create_Medical_History_For_Specific_Animal();

        MedicalHistory medicalHistoryToDelete = medicalHistoryRepository.findByAnimalName("Test");
        medicalHistoryRepository.delete(medicalHistoryToDelete);

        Assertions.assertFalse(medicalHistoryRepository.existsByAnimalName("Test"));
    }

    @Test
    public void Should_Get_All_Medical_History() {
        List<MedicalHistory> medicalHistories = medicalHistoryRepository.findAll();
        Assertions.assertTrue(medicalHistories.size() > 0);
    }

    @AfterEach
    public void after() {
        Animal testAnimal = animalRepository.findAnimalByName("Test");
        animalRepository.delete(testAnimal);
    }

}
