package com.CMS.Web.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CMS.Web.Entities.Student;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StudentService {

	@Autowired
	private StudentFetch stuFetch;

	public List<Student> getStudents() {
		return stuFetch.findAll();
	}

	public void saveStudent(Student student) {
		stuFetch.save(student);
	}

	public Student getStudent(Integer id) {
		return stuFetch.findById(id).get();
	}

	public void deleteStudent(Integer id) {
		stuFetch.deleteById(id);
	}
}
