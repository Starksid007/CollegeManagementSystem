package com.CMS.Web.Service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CMS.Web.Entities.Course;

public interface CourseFetch extends JpaRepository<Course, Integer> {

}
