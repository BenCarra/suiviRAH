package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.service.ProjetService;

@RestController
public class ProjetController {
	
	@Autowired
	ProjetService projetService;
	
	@GetMapping("/projetsByComposition/{id}")
	public List<ProjetDTO> getProjetsByComposition(@PathVariable int id) {
		return projetService.getProjetsByComposition(id);
		
	}
	
	@GetMapping("/projetsByEquipe/{id}")
	public ResponseEntity<List<ProjetDTO>> getProjetsByEquipe(@PathVariable int id) {
		return projetService.getProjetsByEquipe(id);
	}
	
	@GetMapping("/projetsByUtilisateur/{id}")
	public ResponseEntity<List<ProjetDTO>> getProjetsByUtilisateur(@PathVariable int id) {
		return projetService.getProjetsByUtilisateur(id);
	}
	


}
