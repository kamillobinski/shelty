package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.MedicalData;
import kamillobinski.sheltybackend.service.MedicalDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/medical-data")
public class MedicalDataController {

    @Autowired
    private MedicalDataService medicalDataService;

    @PutMapping(value="/{animalId}/update")
    public void updateMedicalData(@PathVariable String animalId, @RequestParam String graftingDate, @RequestParam String dewormingDate,
                                @RequestParam String sterilizationDate, @RequestParam String description) throws ParseException {
        medicalDataService.saveData(animalId, graftingDate, dewormingDate, sterilizationDate, description);
    }

    @GetMapping(value="/{animalId}")
    public MedicalData getMedicalData(@PathVariable String animalId) { return medicalDataService.getData(animalId); }

    @DeleteMapping(value = "/{animalId}/delete")
    public void deleteMedicalData(@PathVariable String animalId) {
        medicalDataService.deleteData(animalId);
    }

}
