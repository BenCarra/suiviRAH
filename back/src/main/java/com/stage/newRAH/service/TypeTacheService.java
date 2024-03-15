package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TypeTacheDTO;
import com.stage.newRAH.model.Tache;
import com.stage.newRAH.model.TypeTache;
import com.stage.newRAH.repository.TypeTacheRepository;

@Service
public class TypeTacheService {
	
	@Autowired 
	TypeTacheRepository typeTacheRepository;
	
	public TypeTacheDTO mapTypeTacheToDTO(TypeTache typeTache) {
		List<List<String>> taches = new ArrayList<>();

		TypeTacheDTO typeTacheDTO = new TypeTacheDTO();
		
		typeTacheDTO.setIdTypeTache(typeTache.getIdTypeTache());
		typeTacheDTO.setLibelle(typeTache.getLibelle());

		if (typeTache.getListTaches() != null) {
			for (Tache tache : typeTache.getListTaches()) {
				List<String> tacheObject = new ArrayList<>();
				tacheObject.add(String.valueOf(tache.getIdTache()));
				tacheObject.add(tache.getNomTache());
				taches.add(tacheObject);
			}
			typeTacheDTO.setListTaches(taches);
		}
		
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

	public ResponseEntity<TypeTacheDTO> getTypeTacheByLibelle(String libelle) {
		Optional<TypeTache> typeTacheChoisie = typeTacheRepository.findByLibelle(libelle);
		
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
		Optional<TypeTache> typeTacheAModifierOptional = typeTacheRepository.findById(id);
		
		if (typeTacheAModifierOptional.isPresent()) {
			TypeTache typeTacheAModifier = typeTacheAModifierOptional.get();
			typeTacheAModifier.setLibelle(typeTacheDTO.getLibelle());
		
			typeTacheRepository.save(typeTacheAModifier);
			
			TypeTacheDTO typeTacheAModifierDTO = this.mapTypeTacheToDTO(typeTacheAModifier);
			
			return ResponseEntity.ok(typeTacheAModifierDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

		
	}
}
