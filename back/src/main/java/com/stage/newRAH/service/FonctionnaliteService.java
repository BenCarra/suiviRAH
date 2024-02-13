package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.FonctionnaliteDTO;
import com.stage.newRAH.model.Droit;
import com.stage.newRAH.model.Fonctionnalite;
import com.stage.newRAH.model.TypeUtilisateur;
import com.stage.newRAH.repository.DroitRepository;
import com.stage.newRAH.repository.FonctionnaliteRepository;

@Service
public class FonctionnaliteService {
	
	@Autowired
	FonctionnaliteRepository fonctionnaliteRepository;
	
	@Autowired
	DroitRepository droitRepository;
	
		
	public FonctionnaliteDTO mapFonctionnaliteToDTO (Fonctionnalite fonctionnalite) {
		FonctionnaliteDTO fonctionnaliteDTO = new FonctionnaliteDTO();
		
		fonctionnaliteDTO.setIdFonctionnalite(fonctionnalite.getIdFonctionnalite());
		fonctionnaliteDTO.setLibelle(fonctionnalite.getLibelle());
		
		return fonctionnaliteDTO;
		
	}
	
	public ResponseEntity<List<FonctionnaliteDTO>> getFonctionnalitesByTypeUtilisateur(TypeUtilisateur typeUtilisateur) {

		List<FonctionnaliteDTO> fonctionnalitesDTO = new ArrayList<>();
		
		 // Récupération des droits pour le type d'utilisateur spécifié en entrée
        List<Droit> droits = droitRepository.findByTypeUtilisateur(typeUtilisateur);
        
        // Filtrage des fonctionnalités ayant l'attribut aDroit égal à true
        for (Droit droit : droits) {
            if (droit.isADroit()) {
            	Fonctionnalite fonctionnalite = droit.getFonctionnalite();
            	if (fonctionnalite != null) {
            		// Transformation des Fonctionnalite en FonctionnaliteDTO
            		FonctionnaliteDTO fonctionnaliteDTO = mapFonctionnaliteToDTO(fonctionnalite);
            		fonctionnalitesDTO.add(fonctionnaliteDTO);
            	}
            }
        }		
		return ResponseEntity.ok(fonctionnalitesDTO);		
	}
	

}
