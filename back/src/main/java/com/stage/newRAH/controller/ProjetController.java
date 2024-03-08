package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.service.ProjetService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {
	
	@Autowired
	ProjetService projetService;

	@GetMapping("/projets")
	public ResponseEntity<List<ProjetDTO>> getProjets() {
		return projetService.getProjets();
	}
	
}
