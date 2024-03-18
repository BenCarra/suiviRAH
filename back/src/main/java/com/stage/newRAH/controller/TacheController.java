package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TacheDTO;
import com.stage.newRAH.service.TacheService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TacheController {
	
	@Autowired
	TacheService tacheService;

	@GetMapping("/taches")
	public ResponseEntity<List<TacheDTO>> getTaches() {
		return tacheService.getTaches();
	}
	
	@GetMapping("/tache/{id}")
	public ResponseEntity<TacheDTO> getTacheById(@PathVariable int id) {
		return tacheService.getTacheById(id);
	}
	
	@GetMapping("/tachesByProjet/{id}")
	public ResponseEntity<List<TacheDTO>> getTachesByProjet(@PathVariable int id) {
		return tacheService.getTachesByProjet(id);
	}
	
	@GetMapping("/tachesByUtilisateur/{id}")
	public ResponseEntity<List<TacheDTO>> getTachesByUtilisateur(@PathVariable int id) {
		return tacheService.getTachesByUtilisateur(id);
	}

	@GetMapping("/listAnneesTaches")
	public ResponseEntity<List<Integer>> getListAnneesTaches() {
		return tacheService.getListAnneesTaches();
	}
	

}

	

