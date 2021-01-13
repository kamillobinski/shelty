package kamillobinski.sheltybackend.service;

import kamillobinski.sheltybackend.entity.Animal;
import kamillobinski.sheltybackend.entity.MedicalData;
import kamillobinski.sheltybackend.entity.MedicalHistory;
import kamillobinski.sheltybackend.repository.MedicalHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private AnimalService animalService;

    public List<MedicalHistory> getData(String animalId) {
        Animal animal = animalService.getAnimal(animalId);
        return medicalHistoryRepository.findAllByAnimal(animal);
    }

    public void saveData(String animalId, String type, String medicine, String vet, String date, String isCompleted) {
        Date date_sql = new Date();
        try {
            date_sql = parseDate(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Animal animal = animalService.getAnimal(animalId);
        Boolean isCompletedBoolean = Boolean.valueOf(isCompleted);

        MedicalHistory newMedicalHistory = new MedicalHistory();
        newMedicalHistory.setAnimal(animal);
        newMedicalHistory.setType(type);
        newMedicalHistory.setMedicine(medicine);
        newMedicalHistory.setDate(date_sql);
        newMedicalHistory.setVet(vet);
        newMedicalHistory.setCompleted(isCompletedBoolean);

        medicalHistoryRepository.save(newMedicalHistory);

    }

    public void deleteData(String medicalHistoryId) {
        medicalHistoryRepository.deleteById(Integer.parseInt(medicalHistoryId));
    }

    public void updateDataStatus(String medicalHistoryId, String status) {
        MedicalHistory medicalHistory = medicalHistoryRepository.findById(Integer.parseInt(medicalHistoryId));
        medicalHistory.setCompleted(Boolean.valueOf(status));
        medicalHistoryRepository.save(medicalHistory);
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
