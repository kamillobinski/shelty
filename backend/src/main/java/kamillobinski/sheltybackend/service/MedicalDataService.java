package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.MedicalData;
import kamillobinski.sheltybackend.repository.MedicalDataRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;

@Service
public class MedicalDataService {

    private final AnimalService animalService;
    private final MedicalDataRepository medicalDataRepository;

    public MedicalDataService(AnimalService animalService, MedicalDataRepository medicalDataRepository) {
        this.animalService = animalService;
        this.medicalDataRepository = medicalDataRepository;
    }

    public void saveData(String animalId, String griftingDate, String dewormingDate, String sterilizationDate, String description) throws ParseException {
        Animal animal = animalService.getAnimal(animalId);
        Date griftingDate_sql = animalService.parseDate(griftingDate);
        Date dewormingDate_sql = animalService.parseDate(dewormingDate);
        Date sterilizationDate_sql = animalService.parseDate(sterilizationDate);

        // Check if medical data exists
        MedicalData databaseMedicalData = medicalDataRepository.findByAnimal(animal);

        if(databaseMedicalData != null) {
            // perform save
            databaseMedicalData.setGraftingDate(griftingDate_sql);
            databaseMedicalData.setDewormingDate(dewormingDate_sql);
            databaseMedicalData.setSterilizationDate(sterilizationDate_sql);
            databaseMedicalData.setDescription(description);

            medicalDataRepository.save(databaseMedicalData);
        } else {
            // create new
            MedicalData newMedicalData = new MedicalData();
            newMedicalData.setAnimal(animal);
            newMedicalData.setGraftingDate(griftingDate_sql);
            newMedicalData.setDewormingDate(dewormingDate_sql);
            newMedicalData.setSterilizationDate(sterilizationDate_sql);
            newMedicalData.setDescription(description);

            medicalDataRepository.save(newMedicalData);
        }

    }

    public MedicalData getData(String animalId) {
        Animal animal = animalService.getAnimal(animalId);
        return medicalDataRepository.findByAnimal(animal);
    }

    public void deleteData(String animalId) {
        Animal animal = animalService.getAnimal(animalId);
        medicalDataRepository.deleteByAnimal(animal);
    }

}
