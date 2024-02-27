package com.stage.newRAH.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.FonctionnaliteDTO;
import com.stage.newRAH.model.TypeUtilisateur;
import com.stage.newRAH.repository.TypeUtilisateurRepository;
import com.stage.newRAH.service.FonctionnaliteService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FonctionnaliteController {

	@Autowired
	FonctionnaliteService fonctionnaliteService;
	
	@Autowired
	TypeUtilisateurRepository typeUtilisateurRepository;
	
	@GetMapping("/fonctionnalites")
	public ResponseEntity<List<FonctionnaliteDTO>> getFonctionnalites(){
		return fonctionnaliteService.getFonctionnalites();
	}
	
	@GetMapping("/fonctionnalites/{id}")
	public ResponseEntity<FonctionnaliteDTO> getFonctionnaliteById(@PathVariable int id){
		return fonctionnaliteService.getFonctionnaliteById(id);
	}
	
	@GetMapping("/fonctionnalitesByTypeUtilisateur/{idTypeUtilisateur}")
	public ResponseEntity<List<FonctionnaliteDTO>> getFonctionnalitesByTypeUtilisateur(@PathVariable int idTypeUtilisateur) {
		// Récupération du TypeUtilisateur à partir de l'identifiant
		Optional<TypeUtilisateur> typeUtilisateurOptional = typeUtilisateurRepository.findById(idTypeUtilisateur);
		
		// Vérification de si le TypeUtilisateur existe
	    if (typeUtilisateurOptional.isEmpty()) {
	        // Retourner une réponse 404 si le TypeUtilisateur n'existe pas
	        return ResponseEntity.notFound().build();
	    }
	    
	 // Extraction de l'objet TypeUtilisateur de l'Optional
	    TypeUtilisateur typeUtilisateur = typeUtilisateurOptional.get();
	    
		return fonctionnaliteService.getFonctionnalitesByTypeUtilisateur(typeUtilisateur);
	}
	
	@GetMapping("/fonctionnaliteByLibelle/{libelle}")
	public ResponseEntity<FonctionnaliteDTO> getFonctionnaliteByLibelle(@PathVariable String libelle) {
		return fonctionnaliteService.getFonctionnaliteByLibelle(libelle);
	}
	
	@PostMapping("/createFonctionnalite")
	public ResponseEntity<FonctionnaliteDTO> createFonctionnalite(@RequestBody FonctionnaliteDTO fonctionnaliteDTO) {
		return fonctionnaliteService.createFonctionnalite(fonctionnaliteDTO);
	}
	
	@PostMapping("/updateFonctionnalite/{id}")
	public ResponseEntity<FonctionnaliteDTO> updateFonctionnalite(@RequestBody FonctionnaliteDTO fonctionnaliteDTO, @PathVariable int id) {
		return fonctionnaliteService.updateFonctionnalite(fonctionnaliteDTO, id);
	}
	
	@PostMapping("/deleteFonctionnalite/{id}")
	public ResponseEntity<FonctionnaliteDTO> deleteFonctionnalite(@PathVariable int id) {
		return fonctionnaliteService.deleteFonctionnalite(id);
	}
	
}
