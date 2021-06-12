package kamillobinski.sheltybackend;

import kamillobinski.sheltybackend.entity.Size;
import kamillobinski.sheltybackend.repository.SizeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@SpringBootTest
class SizeTests {

	@Autowired
	private SizeRepository sizeRepository;

	@Test
	public void Should_Create_Size () {
		Size size = new Size();
		size.setType("test");
		sizeRepository.save(size);
		Assertions.assertNotNull(sizeRepository.findByType("test"));
	}

	@Test
	public void Should_Delete_Size() {
		sizeRepository.deleteByType("test");
		Assertions.assertFalse(sizeRepository.existsByType("test"));
	}

	@Test
	public void Should_Get_First_Size() {
		Size size = sizeRepository.findById(1);
		Assertions.assertEquals("small", size.getType());
	}

	@Test
	public void Should_Get_All_Sizes() {
		List<Size> sizes = sizeRepository.findAll();

		List<String> expected = new ArrayList<>();
		expected.add("small");
		expected.add("medium");
		expected.add("large");

		int counter = 0;
		for(Size size : sizes) {
			Assertions.assertEquals(expected.get(counter), size.getType());
			counter++;
		}
	}

}
