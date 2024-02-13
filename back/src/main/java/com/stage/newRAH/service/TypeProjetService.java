package com.stage.newRAH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TypeProjetDTO;
import com.stage.newRAH.model.TypeProjet;
import com.stage.newRAH.repository.TypeProjetRepository;

@Service
public class TypeProjetService {
	
	@Autowired
	TypeProjetRepository typeProjetRepository;
	
	public TypeProjetDTO mapTypeProjetToDTO(TypeProjet typeProjet) {
		TypeProjetDTO typeProjetDTO = new TypeProjetDTO();
		
		typeProjetDTO.setIdTypeProjet(typeProjet.getIdTypeProjet());
		typeProjetDTO.setLibelle(typeProjet.getLibelle());
		
		return typeProjetDTO;
		
	}

}
