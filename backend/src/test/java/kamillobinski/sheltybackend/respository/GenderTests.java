package kamillobinski.sheltybackend.respository;

import kamillobinski.sheltybackend.entity.Gender;
import kamillobinski.sheltybackend.repository.GenderRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@SpringBootTest
public class GenderTests {

    @Autowired
    private GenderRepository genderRepository;

    @Test
    public void Should_Get_First_Gender() {
        Gender gender = genderRepository.findById(1);
        Assertions.assertEquals("male", gender.getType());
    }

    @Test
    public void Should_Get_All_Genders() {
        List<Gender> genders = genderRepository.findAll();

        List<String> expected = new ArrayList<>();
        expected.add("male");
        expected.add("female");
        expected.add("unknown");

        int counter = 0;
        for(Gender gender : genders) {
            Assertions.assertEquals(expected.get(counter), gender.getType());
            counter++;
        }

    }

}

