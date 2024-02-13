package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TypeUtilisateurDTO;
import com.stage.newRAH.model.TypeUtilisateur;
import com.stage.newRAH.repository.TypeUtilisateurRepository;

@Service
public class TypeUtilisateurService {
	
	@Autowired
	TypeUtilisateurRepository typeUtilisateurRepository;
	
	@Autowired
	FonctionnaliteService fonctionnaliteService;
	
	public TypeUtilisateurDTO mapTypeUtilisateurToDTO(TypeUtilisateur typeUtilisateur) {
		TypeUtilisateurDTO typeUtilisateurDTO = new TypeUtilisateurDTO();
		
		typeUtilisateurDTO.setIdTypeUtilisateur(typeUtilisateur.getIdTypeUtilisateur());
		typeUtilisateurDTO.setLibelle(typeUtilisateur.getLibelle());
		
		return typeUtilisateurDTO;
	}
	
	public ResponseEntity<List<TypeUtilisateurDTO>> getTypeUtilisateurs(){
		Iterable<TypeUtilisateur> typeUtilisateurs = typeUtilisateurRepository.findAll();
		
		if (typeUtilisateurs.iterator().hasNext()) {
		List<TypeUtilisateurDTO> typeUtilisateursDTO = new ArrayList<>();
		
		for (TypeUtilisateur typeUtilisateur : typeUtilisateurs) {
			TypeUtilisateurDTO typeUtilisateurDTO = mapTypeUtilisateurToDTO(typeUtilisateur);
			typeUtilisateursDTO.add(typeUtilisateurDTO);
		}
		return ResponseEntity.ok(typeUtilisateursDTO); 
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	

}
