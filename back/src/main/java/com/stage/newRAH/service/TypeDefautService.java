package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TypeDefautDTO;
//import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.TypeDefaut;
import com.stage.newRAH.repository.TypeDefautRepository;

@Service
public class TypeDefautService {
	
	@Autowired
	TypeDefautRepository typeDefautRepository;
	
	public TypeDefautDTO mapTypeDefautToDTO(TypeDefaut typeDefaut) {
		//List<List<String>> projets = new ArrayList<>();

		TypeDefautDTO typeDefautDTO = new TypeDefautDTO();
		
		typeDefautDTO.setIdTypeDefaut(typeDefaut.getIdTypeDefaut());
		typeDefautDTO.setLibelle(typeDefaut.getLibelle());

		/*if (typeDefaut.getListProjets() != null) {
			for (Projet projet : typeDefaut.getListProjets()) {
				List<String> projetObject = new ArrayList<>();
				projetObject.add(String.valueOf(projet.getIdProjet()));
				projetObject.add(projet.getNomProjet());
				projets.add(projetObject);
			}
			typeDefautDTO.setListProjets(projets);
		}*/
		
		return typeDefautDTO;
	}

	public ResponseEntity<List<TypeDefautDTO>> getTypesDefaut() {
		Iterable<TypeDefaut> typesDefaut = typeDefautRepository.findAll();
		
		if (typesDefaut.iterator().hasNext()) {
			List<TypeDefautDTO> typesDefautDTO = new ArrayList<>();
			for (TypeDefaut typeDefaut : typesDefaut) {
				TypeDefautDTO typeDefautDTO = this.mapTypeDefautToDTO(typeDefaut);
				typesDefautDTO.add(typeDefautDTO);
			}
			return ResponseEntity.ok(typesDefautDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeDefautDTO> getTypeDefautById(int id) {
		Optional<TypeDefaut> typeDefautChoisi = typeDefautRepository.findById(id);
		
		if (typeDefautChoisi.isPresent()) {
			TypeDefautDTO typeDefautChoisiDTO = this.mapTypeDefautToDTO(typeDefautChoisi.get());
			return ResponseEntity.ok(typeDefautChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeDefautDTO> getTypeDefautByLibelle(String libelle) {
		Optional<TypeDefaut> typeDefautChoisi = typeDefautRepository.findByLibelle(libelle);
		
		if (typeDefautChoisi.isPresent()) {
			TypeDefautDTO typeDefautChoisiDTO = this.mapTypeDefautToDTO(typeDefautChoisi.get());
			return ResponseEntity.ok(typeDefautChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeDefautDTO> createTypeDefaut(TypeDefautDTO typeDefautDTO) {
		TypeDefaut nouveauTypeDefaut = new TypeDefaut();
		
		nouveauTypeDefaut.setLibelle(typeDefautDTO.getLibelle());
		
		typeDefautRepository.save(nouveauTypeDefaut);
		
		TypeDefautDTO nouveauTypeDefautDTO = this.mapTypeDefautToDTO(nouveauTypeDefaut);
		
		return ResponseEntity.ok(nouveauTypeDefautDTO);
	}

	public ResponseEntity<TypeDefautDTO> updateTypeDefaut(TypeDefautDTO typeDefautDTO, int id) {
		Optional<TypeDefaut> typeDefautAModifierOptional = typeDefautRepository.findById(id);

		if (typeDefautAModifierOptional.isPresent()) {
			TypeDefaut typeDefautAModifier = typeDefautAModifierOptional.get();
			typeDefautAModifier.setLibelle(typeDefautDTO.getLibelle());
		
			typeDefautRepository.save(typeDefautAModifier);
			
			TypeDefautDTO typeDefautAModifierDTO = this.mapTypeDefautToDTO(typeDefautAModifier);
			
			return ResponseEntity.ok(typeDefautAModifierDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
		
		
	}

}
