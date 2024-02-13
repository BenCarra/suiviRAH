package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.FonctionnaliteDTO;
import com.stage.newRAH.model.Droit;
import com.stage.newRAH.model.Fonctionnalite;
import com.stage.newRAH.model.TypeUtilisateur;
import com.stage.newRAH.repository.DroitRepository;
import com.stage.newRAH.repository.FonctionnaliteRepository;
import com.stage.newRAH.repository.TypeUtilisateurRepository;

@Service
public class FonctionnaliteService {
	
	@Autowired
	FonctionnaliteRepository fonctionnaliteRepository;
	
	@Autowired
	TypeUtilisateurRepository typeUtilisateurRepository;
	
	@Autowired
	DroitRepository droitRepository;
	
	public FonctionnaliteDTO mapFonctionnaliteToDTO (Fonctionnalite fonctionnalite) {
		FonctionnaliteDTO fonctionnaliteDTO = new FonctionnaliteDTO();
		
		fonctionnaliteDTO.setIdFonctionnalite(fonctionnalite.getIdFonctionnalite());
		fonctionnaliteDTO.setLibelle(fonctionnalite.getLibelle());
		
		return fonctionnaliteDTO;
		
	}
	
	public ResponseEntity<List<FonctionnaliteDTO>> getFonctionnalitesByTypeUtilisateur(
			TypeUtilisateur typeUtilisateur) {
			
			List<FonctionnaliteDTO> fonctionnalitesDTO = new ArrayList<>();
		
			// Récupération des droits pour le type d'utilisateur spécifié en entrée
			Iterable<Droit> listDroitsByTypeUtilisateur = droitRepository.findByTypeUtilisateur(typeUtilisateur.getIdTypeUtilisateur());
			
			// Filtrage des fonctionnalités ayant l'attribut aDroit égal à true
			for (Droit droit : listDroitsByTypeUtilisateur) {
				if (droit.isADroit()) {
					Fonctionnalite fonctionnalite = droit.getFonctionnalite();
						if (fonctionnalite != null) {
							// Transformation des Fonctionnalite en FonctionnaliteDTO
							FonctionnaliteDTO fonctionnaliteDTO = this.mapFonctionnaliteToDTO(fonctionnalite);
							fonctionnalitesDTO.add(fonctionnaliteDTO);
						}
				}
			}
			return ResponseEntity.ok(fonctionnalitesDTO);
			
	}

	public ResponseEntity<List<FonctionnaliteDTO>> getFonctionnalites() {
		Iterable<Fonctionnalite> fonctionnalites = fonctionnaliteRepository.findAll();
		
		if (fonctionnalites.iterator().hasNext()) {
			List<FonctionnaliteDTO> fonctionnalitesDTO = new ArrayList<>();
			
			for (Fonctionnalite fonctionnalite : fonctionnalites) {
				FonctionnaliteDTO fonctionnaliteDTO = this.mapFonctionnaliteToDTO(fonctionnalite);
				fonctionnalitesDTO.add(fonctionnaliteDTO);
			}
			return ResponseEntity.ok(fonctionnalitesDTO);
		} else {
			return ResponseEntity.noContent().build();
		}
		
	}

	public ResponseEntity<FonctionnaliteDTO> getFonctionnaliteById(int id) {
		Optional<Fonctionnalite> fonctionnaliteChoisie =  fonctionnaliteRepository.findById(id);
		
		if (fonctionnaliteChoisie.isPresent()) {	
			FonctionnaliteDTO fonctionnaliteDTO = this.mapFonctionnaliteToDTO(fonctionnaliteChoisie.get());
			return ResponseEntity.ok(fonctionnaliteDTO);
		} else {
			return ResponseEntity.notFound().build();		
		}
	}

	public ResponseEntity<FonctionnaliteDTO> getFonctionnaliteByLibelle(String libelle) {
		Optional<Fonctionnalite> fonctionnaliteChoisie =  fonctionnaliteRepository.findByLibelle(libelle);
		
		if (fonctionnaliteChoisie.isPresent()) {	
			FonctionnaliteDTO fonctionnaliteDTO = this.mapFonctionnaliteToDTO(fonctionnaliteChoisie.get());
			return ResponseEntity.ok(fonctionnaliteDTO);
		} else {
			return ResponseEntity.notFound().build();		
		}
	}

	public ResponseEntity<FonctionnaliteDTO> createFonctionnalite(FonctionnaliteDTO fonctionnaliteDTO) {
		
		Fonctionnalite nouvelleFonctionnalite = new Fonctionnalite();
		
		nouvelleFonctionnalite.setLibelle(fonctionnaliteDTO.getLibelle());
		
		fonctionnaliteRepository.save(nouvelleFonctionnalite);
		
		FonctionnaliteDTO nouvelleFonctionnaliteDTO = this.mapFonctionnaliteToDTO(nouvelleFonctionnalite);
		
		return ResponseEntity.ok(nouvelleFonctionnaliteDTO);
	}

	public ResponseEntity<FonctionnaliteDTO> updateFonctionnalite(FonctionnaliteDTO fonctionnaliteDTO, int id) {
		Fonctionnalite fonctionnaliteAModifier = fonctionnaliteRepository.findById(id).get();
		
		fonctionnaliteAModifier.setLibelle(fonctionnaliteDTO.getLibelle());
		
		fonctionnaliteRepository.save(fonctionnaliteAModifier);
		
		FonctionnaliteDTO fonctionnaliteAModifierDTO = this.mapFonctionnaliteToDTO(fonctionnaliteAModifier);
		
		return ResponseEntity.ok(fonctionnaliteAModifierDTO);
	}

	public ResponseEntity<FonctionnaliteDTO> deleteFonctionnalite(int id) {
		Fonctionnalite fonctionnaliteAEffacer = fonctionnaliteRepository.findById(id).get();
		
		FonctionnaliteDTO fonctionnaliteAEffacerDTO = this.mapFonctionnaliteToDTO(fonctionnaliteAEffacer);
		
		fonctionnaliteRepository.deleteById(id);
		
		return ResponseEntity.ok(fonctionnaliteAEffacerDTO);

	}

}
