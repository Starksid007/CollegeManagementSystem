package com.CMS.Web.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CMS.Web.Entities.Branch;

@Service
public class BranchService {

	@Autowired
	private BranchFetch braFetch;

	public List<Branch> getBranches() {
		return braFetch.findAll();
	}

	public Branch getBranch(String code) {
		return braFetch.findById(code).get();
	}

	public void saveBranch(Branch branch) {
		braFetch.save(branch);
	}

	public void deleteBranch(String code) {
		braFetch.deleteById(code);
	}
}
