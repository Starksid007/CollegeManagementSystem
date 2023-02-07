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

import com.CMS.Web.Entities.Course;
import com.CMS.Web.Service.CourseService;

@RestController
@CrossOrigin("*")
public class CourseController {

	@Autowired
	CourseService couService;

	@GetMapping(path = "courses")
	List<Course> getCourses() {
		return couService.getCourses();
	}

	@GetMapping(path = "courses/{id}")
	public Course getCourse(@PathVariable Integer id) {
		Course course = couService.getCourse(id);
		return course;
	}

	@PostMapping(path = "courses")
	public Course saveCourse(@RequestBody Course course) {
		couService.saveCourse(course);
		return course;
	}

	@DeleteMapping(path = "courses/{id}")
	public void deleteCourse(@PathVariable Integer id) {
		couService.deleteCourse(id);
	}

	@PutMapping(path = "courses/{id}")
	public Course updateCourse(@RequestBody Course course) {
		couService.saveCourse(course);
		return course;
	}
}
