package com.CMS.Web.Service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CMS.Web.Entities.Faculty;

public interface FacultyFetch extends JpaRepository<Faculty, Integer> {

}
