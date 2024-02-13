package com.stage.newRAH.service;

import org.springframework.beans.factory.annotation.Autowired;
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
		typeTacheDTO.setCategorie(typeTache.getLibelle());
		
		return typeTacheDTO;
	}

}
