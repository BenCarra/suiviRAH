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

import com.stage.newRAH.dto.TacheDTO;
import com.stage.newRAH.service.TacheService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TacheController {
	
	@Autowired
	TacheService tacheService;
	
	@GetMapping("/taches")
	public ResponseEntity<List<TacheDTO>> getTaches(){
		return tacheService.getTaches();
	}
	
	@GetMapping("/tacheById/{id}")
	public ResponseEntity<TacheDTO> getTacheById(@PathVariable int id) {
		return tacheService.getTacheById(id);
	}
	
	@GetMapping("/tachesByUtilisateur/{idUtilisateur}")
	public ResponseEntity<List<TacheDTO>> getTachesByUtilisateur(@PathVariable int idUtilisateur) {
		return tacheService.getTachesByUtilisateur(idUtilisateur);
	}
	
	@GetMapping("/tachesByProjet/{idProjet}")
	public ResponseEntity<List<TacheDTO>> getTachesByProjet(@PathVariable int idProjet) {
		return tacheService.getTachesByProjet(idProjet);
	}
	
	@GetMapping("/tachesByTypeTache/{idTypeTache}")
	public ResponseEntity<List<TacheDTO>> getTachesByTypeTache(@PathVariable int idTypeTache) {
		return tacheService.getTachesByTypeTache(idTypeTache);
	}
	
	@GetMapping("/tachesByEquipe/{idEquipe}")
	public ResponseEntity<List<TacheDTO>> getTachesByEquipe(@PathVariable int idEquipe) {
		return tacheService.getTachesByEquipe(idEquipe);
	}
	
	@PostMapping("/createTache")
	public ResponseEntity<TacheDTO> createTache(@RequestBody TacheDTO tacheDTO) {
		return tacheService.createTache(tacheDTO);
	}
	
	@PostMapping("/updateTache/{id}")
	public ResponseEntity<TacheDTO> updateTache(@RequestBody TacheDTO tacheDTO, @PathVariable int id){
		return tacheService.updateTache(tacheDTO, id);
	}
	
	@PostMapping("/duplicateTache/{id}")
	public ResponseEntity<TacheDTO> duplicateTache(@RequestBody TacheDTO tacheDTO, @PathVariable int id) {
		return tacheService.duplicateTache(tacheDTO, id);
	}
	
	@PostMapping("/deleteTache/{id}")
	public ResponseEntity<TacheDTO> deleteTache(@PathVariable int id){
		return tacheService.deleteTache(id);
	}
}
