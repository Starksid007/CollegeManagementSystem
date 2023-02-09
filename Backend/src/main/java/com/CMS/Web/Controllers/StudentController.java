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

import com.CMS.Web.Entities.Student;
import com.CMS.Web.Service.StudentService;

@RestController
@CrossOrigin("*")
public class StudentController {

	@Autowired
	StudentService stuService;

	@GetMapping(path = "students")
	List<Student> getStudents() {
		return stuService.getStudents();
	}

	@GetMapping(path = "students/{id}")
	public Student getStudent(@PathVariable Integer id) {
		Student student = stuService.getStudent(id);
		return student;
	}

	@PostMapping(path = "students")
	public void saveStudent(@RequestBody Student student) {
		stuService.saveStudent(student);
	}

	@DeleteMapping(path = "students/{id}")
	public void deleteStudent(@PathVariable Integer id) {
		stuService.deleteStudent(id);
	}

	@PutMapping(path = "students/{id}")
	public Student updateStudent(@RequestBody Student student) {
		stuService.saveStudent(student);
		return student;
	}
	
	@GetMapping(path="students/truncate")
	public void truncateTable() {
		stuService.truncateTable();
	}
}
