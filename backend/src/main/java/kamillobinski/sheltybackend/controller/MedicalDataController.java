package kamillobinski.sheltybackend.controller;

import kamillobinski.sheltybackend.entity.MedicalData;
import kamillobinski.sheltybackend.service.MedicalDataService;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/medical/data")
public class MedicalDataController {

    private final MedicalDataService medicalDataService;

    public MedicalDataController(MedicalDataService medicalDataService) {
        this.medicalDataService = medicalDataService;
    }

    @RequestMapping(value="/save/{animalId}", method = RequestMethod.GET)
    public void saveMedicalData(@PathVariable String animalId, @RequestParam String graftingDate, @RequestParam String dewormingDate,
                                @RequestParam String sterilizationDate, @RequestParam String description) throws ParseException {
        medicalDataService.saveData(animalId, graftingDate, dewormingDate, sterilizationDate, description);
    }

    @RequestMapping(value="/get/{animalId}", method = RequestMethod.GET)
    public MedicalData getMedicalData(@PathVariable String animalId) { return medicalDataService.getData(animalId); }

    @RequestMapping(value = "/delete/{animalId}", method = RequestMethod.GET)
    public void deleteMedicalData(@PathVariable String animalId) {
        medicalDataService.deleteData(animalId);
    }

}
