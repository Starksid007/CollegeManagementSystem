package com.CMS.Web.Service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CMS.Web.Entities.Branch;

public interface BranchFetch extends JpaRepository<Branch, String> {

}
