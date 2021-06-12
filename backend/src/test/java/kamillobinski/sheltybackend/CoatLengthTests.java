package kamillobinski.sheltybackend;

import kamillobinski.sheltybackend.entity.CoatLength;
import kamillobinski.sheltybackend.repository.CoatLengthRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@SpringBootTest
public class CoatLengthTests {

    @Autowired
    private CoatLengthRepository coatLengthRepository;

    @Test
    public void Should_Get_All_Coat_Lengths() {
        List<CoatLength> coatLengths = coatLengthRepository.findAll();

        List<String> expected = new ArrayList<>();
        expected.add("short");
        expected.add("long");

        int counter = 0;
        for(CoatLength coatLength : coatLengths) {
            Assertions.assertEquals(expected.get(counter), coatLength.getType());
            counter++;
        }
    }

}
