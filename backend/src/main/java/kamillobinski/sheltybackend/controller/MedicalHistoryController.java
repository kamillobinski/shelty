package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.MedicalHistory;
import kamillobinski.sheltybackend.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/medical/history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @RequestMapping(value="/get/{animalId}", method = RequestMethod.GET)
    public List<MedicalHistory> getMedicalData(@PathVariable String animalId) { return medicalHistoryService.getData(animalId); }

    @RequestMapping(value="/save/{animalId}", method = RequestMethod.GET)
    public void saveMedialData(@PathVariable String animalId, @RequestParam String type, @RequestParam String medicine,
                               @RequestParam String vet, @RequestParam String date, @RequestParam String isCompleted) {
        medicalHistoryService.saveData(animalId, type, medicine, vet, date, isCompleted);
    }

    @RequestMapping(value="/delete/{medicalHistoryId}", method = RequestMethod.GET)
    public void deleteMedicalData(@PathVariable String medicalHistoryId) { medicalHistoryService.deleteData(medicalHistoryId); }

    @RequestMapping(value="/update/{medicalHistoryId}", method = RequestMethod.GET)
    public void updateMedicalDataStatus(@PathVariable String medicalHistoryId, @RequestParam String status) { medicalHistoryService.updateDataStatus(medicalHistoryId, status); }

}
