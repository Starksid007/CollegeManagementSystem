package com.CMS.Web.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CMS.Web.Entities.Branch;
import com.CMS.Web.Service.BranchService;

@RestController
@CrossOrigin("*")
public class BranchController {

	@Autowired
	BranchService braService;

	@GetMapping(path = "branches")
	List<Branch> getBranches() {
		return braService.getBranches();
	}

	@GetMapping(path = "branches/{code}")
	public Branch getBranch(@PathVariable String code) {
		Branch branch = braService.getBranch(code);
		return branch;
	}

	@PostMapping(path = "branches")
	public Branch saveBranch(@RequestBody Branch branch) {
		braService.saveBranch(branch);
		return branch;
	}

	@DeleteMapping(path = "branches/{id}")
	public void deleteBranch(@PathVariable String code) {
		braService.deleteBranch(code);
	}

	@PutMapping(path = "branches/{code}")
	public Branch updateBranch(@RequestBody Branch branch) {
		braService.saveBranch(branch);
		return branch;
	}

}
