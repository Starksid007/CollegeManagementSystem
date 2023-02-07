package com.CMS.Web.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CMS.Web.Entities.Faculty;
import com.CMS.Web.Service.FacultyService;

@RestController
@CrossOrigin("*")
public class FacultyController {

	@Autowired
	FacultyService facService;

	@GetMapping(path = "faculties")
	List<Faculty> fetFaculties() {
		return facService.getFaculties();
	}

	@GetMapping(path = "faculties/{id}")
	public Faculty getFaculty(@PathVariable Integer id) {
		Faculty faculty = facService.getFaculty(id);
		return faculty;
	}

	@PostMapping(path = "faculties")
	public Faculty saveFaculty(@RequestBody Faculty faculty) {
		facService.saveFaculty(faculty);
		return faculty;
	}

	@DeleteMapping(path = "faculties/{id}")
	public void deleteFaculty(@PathVariable Integer id) {
		facService.deleteFaculty(id);
	}

	@PutMapping(path = "faculties/{id}")
	public Faculty updateFaculty(@RequestBody Faculty faculty) {
		facService.saveFaculty(faculty);
		return faculty;
	}
}
