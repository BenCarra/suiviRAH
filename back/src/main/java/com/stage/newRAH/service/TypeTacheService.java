package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;

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

	public ResponseEntity<List<TypeTacheDTO>> getTypeTaches() {
		Iterable<TypeTache> typeTaches = typeTacheRepository.findAll();
		List<TypeTacheDTO> typeTachesDTO = new ArrayList<>();

		for (TypeTache typeTache : typeTaches) {
			TypeTacheDTO typeTacheDTO = mapTypeTacheToDTO(typeTache);
			typeTachesDTO.add(typeTacheDTO);
		}
		return ResponseEntity.ok(typeTachesDTO);
	}

}
