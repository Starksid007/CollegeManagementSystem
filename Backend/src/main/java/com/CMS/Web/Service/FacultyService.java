package com.CMS.Web.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CMS.Web.Entities.Faculty;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FacultyService {

	@Autowired
	private FacultyFetch facFetch;

	public List<Faculty> getFaculties() {
		return facFetch.findAll();
	}

	public void saveFaculty(Faculty faculty) {
		facFetch.save(faculty);
	}

	public Faculty getFaculty(Integer id) {
		return facFetch.findById(id).get();
	}

	public void deleteFaculty(Integer id) {
		facFetch.deleteById(id);
	}

}
