package com.CMS.Web.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "branches")
public class Branch {

	@Id
	@Column(name = "code")
	private String code;
	@Column(name = "hod")
	private String hod;
	@Column(name = "professors")
	private String professors;
	@Column(name = "courses")
	private String courses;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getHod() {
		return hod;
	}

	public void setHod(String hod) {
		this.hod = hod;
	}

	public String getProfessors() {
		return professors;
	}

	public void setProfessors(String professors) {
		this.professors = professors;
	}

	public String getCourses() {
		return courses;
	}

	public void setCourses(String courses) {
		this.courses = courses;
	}

}
