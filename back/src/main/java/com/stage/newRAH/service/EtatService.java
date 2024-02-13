package com.stage.newRAH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.EtatDTO;
import com.stage.newRAH.model.Etat;
import com.stage.newRAH.repository.EtatRepository;

@Service
public class EtatService {
	
	@Autowired
	EtatRepository etatRepository;
	
	public EtatDTO mapEtatToDTO(Etat etat) {
		EtatDTO etatDTO = new EtatDTO();
		
		etatDTO.setIdEtat(etat.getIdEtat());
		etatDTO.setLibelle(etat.getLibelle());
		
		return etatDTO;
	}

}
