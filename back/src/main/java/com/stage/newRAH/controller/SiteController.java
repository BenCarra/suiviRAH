package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.SiteDTO;
import com.stage.newRAH.service.SiteService;

@RestController
public class SiteController {
	
	@Autowired
	SiteService siteService;
	
	@GetMapping("/site/{id}")
	public ResponseEntity<SiteDTO> getSiteById(@PathVariable int id) {
		return siteService.getSiteById(id);
	}
	
	@GetMapping("/sites")
    public ResponseEntity<List<SiteDTO>> getSites() {
        return siteService.getSites();
    }
}
