package kamillobinski.sheltybackend;

import kamillobinski.sheltybackend.entity.HouseTrained;
import kamillobinski.sheltybackend.repository.HouseTrainedRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@SpringBootTest
public class HouseTrainedTests {

    @Autowired
    private HouseTrainedRepository houseTrainedRepository;

    @Test
    public void Should_Get_All_House_Trained_Options() {
        List<HouseTrained> houseTrainedOptions = houseTrainedRepository.findAll();

        List<String> expected = new ArrayList<>();
        expected.add("yes");
        expected.add("no");
        expected.add("unknown");

        int counter = 0;
        for(HouseTrained houseTrained : houseTrainedOptions) {
            Assertions.assertEquals(expected.get(counter), houseTrained.getType());
            counter++;
        }
    }

}
