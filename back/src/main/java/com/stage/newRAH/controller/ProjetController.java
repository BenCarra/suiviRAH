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
import com.stage.newRAH.service.ProjetService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {
	
	@Autowired
	ProjetService projetService;

	@GetMapping("/projets")
	public ResponseEntity<List<ProjetDTO>> getProjets(){
		return projetService.getProjets();
	}
	
	@GetMapping("/projets/{id}")
	public ResponseEntity<ProjetDTO> getProjetById(@PathVariable int id){
		return projetService.getProjetById(id);
	}
	
	@GetMapping("/projetByNom/{nom}")
	public ResponseEntity<ProjetDTO> getProjetByNom(@PathVariable String nom) {
		return projetService.getProjetByNom(nom);
	}
	
	@GetMapping("/projetsByClient/{idClient}")
	public ResponseEntity<List<ProjetDTO>> getProjetsByClient(@PathVariable int idClient) {
		return projetService.getProjetsByClient(idClient);
	}
	
	@GetMapping("/projetsByComposition/{idComposition}")
	public List<ProjetDTO> getProjetsByComposition(@PathVariable int idComposition) {
		return projetService.getProjetsByComposition(idComposition);
		
	}
	
	@GetMapping("/projetsByEquipe/{idEquipe}")
	public ResponseEntity<List<ProjetDTO>> getProjetsByEquipe(@PathVariable int idEquipe) {
		return projetService.getProjetsByEquipe(idEquipe);
	}
	
	@GetMapping("/projetsByUtilisateur/{idUtilisateur}")
	public ResponseEntity<List<ProjetDTO>> getProjetsByUtilisateur(@PathVariable int idUtilisateur) {
		return projetService.getProjetsByUtilisateur(idUtilisateur);
	}
	
	@PostMapping("/createProjet")
	public ResponseEntity<ProjetDTO> createProjet(@RequestBody ProjetDTO projetDTO) {
		return projetService.createProjet(projetDTO);
	}
	
	@PostMapping("/updateProjet/{id}")
	public ResponseEntity<ProjetDTO> updateProjet(@RequestBody ProjetDTO projetDTO, @PathVariable int id) {
		return projetService.updateProjet(projetDTO, id);
	}
	
	@PostMapping("/duplicateProjet/{id}")
	public ResponseEntity<ProjetDTO> duplicateProjet(@RequestBody ProjetDTO projetDTO, @PathVariable int id) {
		return projetService.duplicateProjet(projetDTO, id);
	}
	
	@DeleteMapping("/deleteProjet/{id}")
	public ResponseEntity<ProjetDTO> deleteProjet(@PathVariable int id) {
		return projetService.deleteProjet(id);
	}

}
