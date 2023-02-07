package com.CMS.Web.Service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CMS.Web.Entities.Student;

public interface StudentFetch extends JpaRepository<Student, Integer> {

}
