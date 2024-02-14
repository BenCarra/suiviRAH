package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.CompositionDTO;
import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.repository.CompositionRepository;
import com.stage.newRAH.repository.EquipeRepository;

@Service
public class CompositionService {
	
	@Autowired
	CompositionRepository compositionRepository;
	
	@Autowired
	EquipeRepository equipeRepository;
	
	public CompositionDTO mapCompositionToDTO(Composition composition) {
		CompositionDTO compositionDTO = new CompositionDTO();
		
		compositionDTO.setIdComposition(composition.getIdComposition());
		compositionDTO.setIdEquipe(composition.getEquipe().getIdEquipe());
		compositionDTO.setIdUtilisateur(composition.getUtilisateur().getIdUtilisateur());
		
		return compositionDTO;
		
	}

	public ResponseEntity<List<CompositionDTO>> getCompositionsByEquipe(int id) {
		Optional<Equipe> equipe = equipeRepository.findById(id);
		List<Composition> compositions = compositionRepository.findByEquipe(equipe.get()); 
		
		List<CompositionDTO> compositionsDTO = new ArrayList<>();
		
		for (Composition composition : compositions) {
			CompositionDTO compositionDTO = mapCompositionToDTO(composition);
			compositionsDTO.add(compositionDTO);
			
		}
		return ResponseEntity.ok(compositionsDTO);		
	}

}
