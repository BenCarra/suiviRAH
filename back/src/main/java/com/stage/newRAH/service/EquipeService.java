package com.stage.newRAH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.EquipeDTO;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.repository.EquipeRepository;

@Service
public class EquipeService {
	
	@Autowired
	EquipeRepository equipeRepository;
	
	public EquipeDTO mapEquipeToDTO(Equipe equipe) {
		EquipeDTO equipeDTO = new EquipeDTO();
		
		equipeDTO.setIdEquipe(equipe.getIdEquipe());
		equipeDTO.setLibelle(equipe.getLibelle());
		
		return equipeDTO;
	}

}
