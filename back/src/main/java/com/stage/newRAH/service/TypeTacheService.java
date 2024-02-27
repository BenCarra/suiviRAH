package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TypeTacheDTO;
import com.stage.newRAH.model.TypeTache;
import com.stage.newRAH.repository.TypeTacheRepository;

@Service
public class TypeTacheService {
	
	@Autowired 
	TypeTacheRepository typeTacheRepository;
	
	public TypeTacheDTO mapTypeTacheToDTO(TypeTache typeTache) {
		TypeTacheDTO typeTacheDTO = new TypeTacheDTO();
		
		typeTacheDTO.setIdTypeTache(typeTache.getIdTypeTache());
		typeTacheDTO.setLibelle(typeTache.getLibelle());
		
		return typeTacheDTO;
	}

	public ResponseEntity<List<TypeTacheDTO>> getTypesTache() {
		Iterable<TypeTache> typesTache = typeTacheRepository.findAll();
		
		if (typesTache.iterator().hasNext()) {
			List<TypeTacheDTO> typesTacheDTO = new ArrayList<>();
			for (TypeTache typeTache : typesTache) {
				TypeTacheDTO typeTacheDTO = this.mapTypeTacheToDTO(typeTache);
				typesTacheDTO.add(typeTacheDTO);
			}
			return ResponseEntity.ok(typesTacheDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}

	public ResponseEntity<TypeTacheDTO> getTypeTacheById(int id) {
		Optional<TypeTache> typeTacheChoisie = typeTacheRepository.findById(id);
		
		if (typeTacheChoisie.isPresent()) {
			TypeTacheDTO typeTacheChoisieDTO = this.mapTypeTacheToDTO(typeTacheChoisie.get());
			return ResponseEntity.ok(typeTacheChoisieDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeTacheDTO> getTypeTacheByCategorie(String categorie) {
		Optional<TypeTache> typeTacheChoisie = typeTacheRepository.findByLibelle(categorie);
		
		if (typeTacheChoisie.isPresent()) {
			TypeTacheDTO typeTacheChoisieDTO = this.mapTypeTacheToDTO(typeTacheChoisie.get());
			return ResponseEntity.ok(typeTacheChoisieDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeTacheDTO> createTypeTache(TypeTacheDTO typeTacheDTO) {
		TypeTache nouveauTypeTache = new TypeTache();
		
		nouveauTypeTache.setLibelle(typeTacheDTO.getLibelle());
		
		typeTacheRepository.save(nouveauTypeTache);
		
		TypeTacheDTO nouveauTypeTacheDTO = this.mapTypeTacheToDTO(nouveauTypeTache);
		
		return ResponseEntity.ok(nouveauTypeTacheDTO);
	}

	public ResponseEntity<TypeTacheDTO> updateTypeTache(TypeTacheDTO typeTacheDTO, int id) {
		TypeTache typeTacheAModifier = typeTacheRepository.findById(id).get();
		
		typeTacheAModifier.setLibelle(typeTacheDTO.getLibelle());
		
		typeTacheRepository.save(typeTacheAModifier);
		
		TypeTacheDTO typeTacheAModifierDTO = this.mapTypeTacheToDTO(typeTacheAModifier);
		
		return ResponseEntity.ok(typeTacheAModifierDTO);
	}

	public ResponseEntity<TypeTacheDTO> deleteTypeTache(int id) {
		TypeTache typeTacheASupprimer = typeTacheRepository.findById(id).get();
		
		TypeTacheDTO typeTacheASupprimerDTO = this.mapTypeTacheToDTO(typeTacheASupprimer);
		
		typeTacheRepository.deleteById(id);
		
		return ResponseEntity.ok(typeTacheASupprimerDTO);
	}

}
