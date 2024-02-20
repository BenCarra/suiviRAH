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


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController {

	@Autowired
	UtilisateurService utilisateurService;
	
	@GetMapping("/utilisateurs")
	public ResponseEntity<List<UtilisateurDTO>> getUtilisateurs() {
		return utilisateurService.getUtilisateurs();
	}
	
	@GetMapping("/utilisateursBySite/{id}")
	public ResponseEntity<List<UtilisateurDTO>> getUtilisateursBySite(@PathVariable int id) {
		return utilisateurService.getUtilisateursBySite(id);
	}

	@DeleteMapping("/deleteUtilisateur/{id}")
	public ResponseEntity<UtilisateurDTO> deleteUtilisateur(@PathVariable int id){
		return utilisateurService.deleteUtilisateur(id);
	}

}
