package com.stage.newRAH.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

	public ResponseEntity<List<EquipeDTO>> getEquipes() {
		// TODO Auto-generated method stub
		return null;
	}

	public ResponseEntity<EquipeDTO> getEquipeById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public ResponseEntity<EquipeDTO> getEquipeByLibelle(String libelle) {
		// TODO Auto-generated method stub
		return null;
	}

	public ResponseEntity<EquipeDTO> createEquipe(EquipeDTO equipeDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	public ResponseEntity<EquipeDTO> updateEquipe(EquipeDTO equipeDTO, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public ResponseEntity<EquipeDTO> deleteEquipe(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
