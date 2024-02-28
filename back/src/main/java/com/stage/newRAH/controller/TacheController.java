package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TacheDTO;
import com.stage.newRAH.service.TacheService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TacheController {
	
	@Autowired
	TacheService tacheService;

	// Ajout de la méthode getTaches pour tester le tuto sur la connexion
	// Spring Boot - Angular
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
	
	@PostMapping("/createTache")
	public ResponseEntity<TacheDTO> createTache(@RequestBody TacheDTO request) {
		return tacheService.createTache(request);
	}

	@DeleteMapping("/tache/{id}")
	public ResponseEntity<?> deleteTache(@PathVariable int id) {
		return tacheService.deleteTache(id);
	}
	
}
