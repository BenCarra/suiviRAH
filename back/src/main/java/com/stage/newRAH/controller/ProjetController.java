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

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.dto.SuiviProjetDTO;
import com.stage.newRAH.service.ProjetService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {
	
	@Autowired
	ProjetService projetService;

	@GetMapping("/projets")
	public ResponseEntity<List<ProjetDTO>> getProjets() {
		return projetService.getProjets();
	}

	@GetMapping("/projetById/{id}")
	public ResponseEntity<ProjetDTO> getProjets(@PathVariable int id) {
		return projetService.getProjetById(id);
	}

	@GetMapping("/projetByNom/{nom}")
	public ResponseEntity<ProjetDTO> getProjetByNom(@PathVariable String nom) {
		return projetService.getProjetByNom(nom);
	}
	
	@GetMapping("/projetByEquipe/{id}")
	public ResponseEntity<ProjetDTO> getProjetByEquipe(@PathVariable int idEquipe) {
		return projetService.getProjetsByEquipe(idEquipe);
	}
	
	@GetMapping("/suiviProjets")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjets() {
		return projetService.getSuiviProjets();
	}

	@GetMapping("/suiviProjetsNonTermines")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsNonTermines(){
		return projetService.getSuiviProjetsNonTermines();
	}

	@GetMapping("/suiviProjetsTermines")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsTermines() {
		return projetService.getSuiviProjetsTermines();
	}

	@GetMapping("/suiviProjetsByClient/{nomClient}")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByClient(@PathVariable String nomClient) {
		return projetService.getSuiviProjetsByClient(nomClient);
	}

	@GetMapping("/suiviProjetsNonTerminesByClient/{nomClient}")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsNonTerminesByClient(@PathVariable String nomClient){
		return projetService.getSuiviProjetsNonTerminesByClient(nomClient);
	}

	@GetMapping("/suiviProjetsTerminesByClient/{nomClient}")
	public ResponseEntity<List<SuiviProjetDTO>> getMethodName(@PathVariable String nomClient) {
		return projetService.getSuiviProjetsTerminesByClient(nomClient);
	}

	@PostMapping("/createProjet")
	public ResponseEntity<ProjetDTO> createProjet(@RequestBody ProjetDTO projetDTO) {
		return projetService.createProjet(projetDTO);
	}

	@PutMapping("/updateProjet/{id}")
	public ResponseEntity<ProjetDTO> updateProjet(@RequestBody ProjetDTO projetDTO, @PathVariable int id) {
		return projetService.updateProjet(projetDTO, id);
	}
	
	@DeleteMapping("/deleteProjet/{id}")
	public ResponseEntity<ProjetDTO> deleteProjet(@PathVariable int id){
		return projetService.deleteProjet(id);
	}
	
}
