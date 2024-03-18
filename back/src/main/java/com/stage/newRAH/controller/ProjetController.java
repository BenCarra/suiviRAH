package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.dto.SuiviProjetDTO;
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

	@GetMapping("/suiviProjets")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjets() {
		return projetService.getSuiviProjets();
	}

	/*@GetMapping("/suiviProjetsByAnnee/{annee}")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByAnnee(@PathVariable int annee) {
		return projetService.getSuiviProjetsByAnnee(annee);
	}*/

	@GetMapping("/suiviProjetsByClient/{nomClient}")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByClient(@PathVariable String nomClient) {
		return projetService.getSuiviProjetsByClient(nomClient);
	}

	/*@GetMapping("/suiviProjetsByClientByAnnee/{nomClient}/{annee}")
	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByClientByAnnee(@PathVariable String nomClient, @PathVariable int annee) {
		return projetService.getSuiviProjetsByClientByAnnee(nomClient, annee);
	}*/
	
}
