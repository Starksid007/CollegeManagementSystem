package com.CMS.Web.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CMS.Web.Entities.Course;

@Service
public class CourseService {

	@Autowired
	private CourseFetch couFetch;

	public List<Course> getCourses() {
		return couFetch.findAll();
	}

	public Course getCourse(Integer id) {
		return couFetch.findById(id).get();
	}

	public void saveCourse(Course course) {
		couFetch.save(course);
	}

	public void deleteCourse(Integer id) {
		couFetch.deleteById(id);
	}

}
