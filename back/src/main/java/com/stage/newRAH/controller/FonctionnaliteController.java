package com.stage.newRAH.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.FonctionnaliteDTO;
import com.stage.newRAH.model.TypeUtilisateur;
import com.stage.newRAH.repository.TypeUtilisateurRepository;
import com.stage.newRAH.service.FonctionnaliteService;

@RestController
public class FonctionnaliteController {
	
	@Autowired
	FonctionnaliteService fonctionnaliteService;
	
	@Autowired
	TypeUtilisateurRepository typeUtilisateurRepository;
	
	@GetMapping("/fonctionnalitesByTypeUtilisateur/{id}")
	public List<FonctionnaliteDTO> getFonctionnalitesByTypeUtilisateur(@PathVariable int id) {
		// Récupération du TypeUtilisateur à partir de l'identifiant
		Optional<TypeUtilisateur> typeUtilisateurOptional = typeUtilisateurRepository.findById(id);
		
		// Vérification de si le TypeUtilisateur existe
	    if (typeUtilisateurOptional.isEmpty()) {
	        
	        return null;
	    }
	    
	 // Extraction de l'objet TypeUtilisateur de l'Optional
	    TypeUtilisateur typeUtilisateur = typeUtilisateurOptional.get();
	    
		return fonctionnaliteService.getFonctionnalitesByTypeUtilisateur(typeUtilisateur);
	}

}
