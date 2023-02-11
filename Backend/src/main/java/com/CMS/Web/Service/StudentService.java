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

	public Student getStudent(String id) {
		return stuFetch.findById(id).get();
	}

	public void deleteStudent(String id) {
		stuFetch.deleteById(id);
	}
	
	public void truncateTable() {
		stuFetch.deleteAll();
	}
}
