package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

	public ResponseEntity<List<TypeUtilisateurDTO>> getTypeUtilisateurs() {
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

	public ResponseEntity<TypeUtilisateurDTO> getTypeUtilisateurById(int id) {
		Optional<TypeUtilisateur> typeUtilisateurChoisi = typeUtilisateurRepository.findById(id);

		if (typeUtilisateurChoisi.isPresent()) {
			TypeUtilisateurDTO typeUtilisateurDTO = this.mapTypeUtilisateurToDTO(typeUtilisateurChoisi.get());
			return ResponseEntity.ok(typeUtilisateurDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<List<TypeUtilisateurDTO>> getTypesUtilisateurByLibelle(String libelle) {
		Iterable<TypeUtilisateur> typesUtilisateurChoisis = typeUtilisateurRepository.findByLibelle(libelle);

		if (typesUtilisateurChoisis.iterator().hasNext()) {
			List<TypeUtilisateurDTO> typesUtilisateurChoisisDTO= new ArrayList<>();
			for (TypeUtilisateur typeUtilisateurChoisi : typesUtilisateurChoisis) {
				TypeUtilisateurDTO typeUtilisateurChoisiDTO = this.mapTypeUtilisateurToDTO(typeUtilisateurChoisi);
				typesUtilisateurChoisisDTO.add(typeUtilisateurChoisiDTO);
			}
			return ResponseEntity.ok(typesUtilisateurChoisisDTO);
			
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeUtilisateurDTO> createTypeUtilisateur(TypeUtilisateurDTO typeUtilisateurDTO) {
		TypeUtilisateur nouveauTypeUtilisateur = new TypeUtilisateur();

		nouveauTypeUtilisateur.setLibelle(typeUtilisateurDTO.getLibelle());

		typeUtilisateurRepository.save(nouveauTypeUtilisateur);

		TypeUtilisateurDTO nouveauTypeUtilisateurDTO = this.mapTypeUtilisateurToDTO(nouveauTypeUtilisateur);
		return ResponseEntity.ok(nouveauTypeUtilisateurDTO);
	}

	public ResponseEntity<TypeUtilisateurDTO> updateTypeUtilisateur(TypeUtilisateurDTO typeUtilisateurDTO, int id) {
		Optional<TypeUtilisateur> typeUtilisateurAModifierOptional = typeUtilisateurRepository.findById(id);

		if (typeUtilisateurAModifierOptional.isPresent()) {
			TypeUtilisateur typeUtilisateurAModifier = typeUtilisateurAModifierOptional.get();
			typeUtilisateurAModifier.setLibelle(typeUtilisateurDTO.getLibelle());
			typeUtilisateurRepository.save(typeUtilisateurAModifier);
			TypeUtilisateurDTO typeUtilisateurAModifierDTO = this.mapTypeUtilisateurToDTO(typeUtilisateurAModifier);
			return ResponseEntity.ok(typeUtilisateurAModifierDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	public ResponseEntity<TypeUtilisateurDTO> deleteTypeUtilisateur(int id) {
		Optional<TypeUtilisateur> typeUtilisateurAEffacerOptional = typeUtilisateurRepository.findById(id);

		if (typeUtilisateurAEffacerOptional.isPresent()){

			TypeUtilisateur typeUtilisateurAEffacer = typeUtilisateurAEffacerOptional.get();

			TypeUtilisateurDTO typeUtilisateurAEffacerDTO = this.mapTypeUtilisateurToDTO(typeUtilisateurAEffacer);

			typeUtilisateurRepository.deleteById(id);

			return ResponseEntity.ok(typeUtilisateurAEffacerDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

		
	}

}
