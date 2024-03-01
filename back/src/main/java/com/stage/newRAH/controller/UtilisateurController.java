package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.UtilisateurDTO;
import com.stage.newRAH.service.UtilisateurService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController {

	@Autowired
	UtilisateurService utilisateurService;

	@GetMapping("/utilisateurs")
	public ResponseEntity<List<UtilisateurDTO>> getUtilisateurs() {
		return utilisateurService.getUtilisateurs();
	}

	@GetMapping("/utilisateurById/{id}")
	public ResponseEntity<UtilisateurDTO> getUtilisateurById(@PathVariable int id) {
		return utilisateurService.getUtilisateurById(id);
	}

	@GetMapping("/utilisateursByNom/{nom}")
	public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByNom(@PathVariable String nom) {
		return utilisateurService.getUtilisateursByNom(nom);
	}

	@GetMapping("/utilisateursByTypeUtilisateur/{libelleTypeUtilisateur}")
	public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByTypeUtilisateur(
			@PathVariable String libelleTypeUtilisateur) {
		return utilisateurService.getUtilisateursByTypeUtilisateur(libelleTypeUtilisateur);
	}

	@GetMapping("/utilisateursBySite/{nomSite}")
	public ResponseEntity<List<UtilisateurDTO>> getUtilisateursBySite(@PathVariable String nomSite) {
		return utilisateurService.getUtilisateursBySite(nomSite);
	}

	@PostMapping("/createUtilisateur")
	public ResponseEntity<UtilisateurDTO> createUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
		return utilisateurService.createUtilisateur(utilisateurDTO);
	}

	@PutMapping("/updateUtilisateur/{id}")
	public ResponseEntity<UtilisateurDTO> updateUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO,
			@PathVariable int id) {
		return utilisateurService.updateUtilisateur(utilisateurDTO, id);
	}

	@DeleteMapping("/deleteUtilisateur/{id}")
	public ResponseEntity<UtilisateurDTO> deleteUtilisateur(@PathVariable int id) {
		return utilisateurService.deleteUtilisateur(id);
	}

}
