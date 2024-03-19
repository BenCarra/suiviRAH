package com.stage.newRAH.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	@GetMapping("/tachesByUtilisateurByMonth/{id}/{mois}/{annee}")
	public ResponseEntity<List<TacheDTO>> getTachesByUtilisateurByMonth(@PathVariable int id, @PathVariable int mois, @PathVariable int annee) {
		return tacheService.getTachesByUtilisateurByMonth(id, mois, annee);
	}

	@GetMapping("/tachesByUtilisateurByWeek/{id}/{numSemaine}/{annee}")
	public ResponseEntity<List<TacheDTO>> getTachesByUtilisateurByWeek(@PathVariable int id, @PathVariable int numSemaine, @PathVariable int annee) {
		return tacheService.getTachesByUtilisateurByWeek(id, numSemaine, annee);
	}

	@GetMapping("/dureeTachesByUtilisateur/{id}/{mois}/{annee}")
	public ResponseEntity<List<Double>> getListDureesTachesByUtilisateurByMonth(@PathVariable int id,@PathVariable int mois, @PathVariable int annee ) {
		return tacheService.getListDureesTachesByUtilisateurByMonth(id, mois, annee);
	}

	// @GetMapping("/tachesByUtilisateurByWeek/{id}/{date}")
	// public ResponseEntity<List<TacheDTO>> getTachesByUtilisateurByWeekByDate(@PathVariable int id, @PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") Date date) {
	// 	return tacheService.getTachesByUtilisateurByWeekByDate(id, date);
	// }
	
	// @GetMapping("/tachesByUtilisateur/{id}/{date}")
	// public ResponseEntity<List<TacheDTO>> getTachesByUtilisateurByDay(@PathVariable int id, @PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") Date date) {
	// 	return tacheService.getTachesByUtilisateurByDay(id, date);
	// }

	// @GetMapping("/dureeTachesByUtilisateur/{id}/{jour}/{mois}/{annee}")
	// public ResponseEntity<Double> getDureeTachesByUtilisateurByDay(@PathVariable int id, @PathVariable int jour, @PathVariable int mois, @PathVariable int annee ) {
	// 	return tacheService.getDureeTachesByUtilisateurByDay(id, jour, mois, annee);
	// }

	@PostMapping("/createTache")
	public ResponseEntity<?> createTache(@RequestBody TacheDTO request) {
		return tacheService.createTache(request);
	}

	@DeleteMapping("/tache/{id}")
	public ResponseEntity<?> deleteTache(@PathVariable int id) {
		return tacheService.deleteTache(id);
	}

	@PutMapping("/tache/{id}")
	public ResponseEntity<?> updateTache(@PathVariable int id, @RequestBody TacheDTO tacheDTO) {
		return tacheService.updateTache(id, tacheDTO);
	} 

	@PostMapping("/duplicateTache/{id}")
	public ResponseEntity<?> duplicateTache(@PathVariable int id, @RequestBody TacheDTO tacheDTO) {
    return tacheService.duplicateTache(id, tacheDTO);
	}

}

	

