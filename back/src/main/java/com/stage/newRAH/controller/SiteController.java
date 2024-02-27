package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.SiteDTO;
import com.stage.newRAH.service.SiteService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SiteController {
	
	@Autowired
	SiteService siteService;
	
	@GetMapping("/sites")
    public ResponseEntity<List<SiteDTO>> getSites() {
        return siteService.getSites();
    }
	
	@GetMapping("/siteById/{id}")
	public ResponseEntity<SiteDTO> getSiteById(@PathVariable int id) {
		return siteService.getSiteById(id);
	}
	
	@GetMapping("/siteByNom/{nom}")
	public ResponseEntity<SiteDTO> getSiteByNom(@PathVariable String nom) {
		return siteService.getSiteByNom(nom);
	}
	
	@PostMapping("/createSite")
	public ResponseEntity<SiteDTO> createSite(@RequestBody SiteDTO siteDTO){
		return siteService.createSite(siteDTO);
	}
	
	@PostMapping("/updateSite/{id}")
	public ResponseEntity<SiteDTO> updateSite(@RequestBody SiteDTO siteDTO, @PathVariable int id){
		return siteService.updateSite(siteDTO, id);
	}
	
	@PostMapping("/deleteSite/{id}")
	public ResponseEntity<SiteDTO> deleteSite(@PathVariable int id){
		return siteService.deleteSite(id);
	}
}
