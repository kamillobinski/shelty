package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.MedicalHistory;
import kamillobinski.sheltybackend.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @PostMapping(value="/{animalId}/create")
    public void createMedicalHistory(@PathVariable String animalId, @RequestParam String type, @RequestParam String medicine,
                               @RequestParam String vet, @RequestParam String date, @RequestParam String isCompleted) {
        medicalHistoryService.saveData(animalId, type, medicine, vet, date, isCompleted);
    }

    @PutMapping(value="/{medicalHistoryId}/update/status")
    public void updateMedicalHistoryStatus(@PathVariable String medicalHistoryId, @RequestParam String status) { medicalHistoryService.updateDataStatus(medicalHistoryId, status); }

    @GetMapping(value="/{animalId}")
    public List<MedicalHistory> getMedicalHistory(@PathVariable String animalId) { return medicalHistoryService.getData(animalId); }

    @DeleteMapping(value="/{medicalHistoryId}/delete")
    public void deleteMedicalHistory(@PathVariable String medicalHistoryId) { medicalHistoryService.deleteData(medicalHistoryId); }


}
