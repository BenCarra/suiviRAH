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
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.CompositionRepository;
import com.stage.newRAH.repository.EquipeRepository;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class CompositionService {

	@Autowired
	CompositionRepository compositionRepository;

	@Autowired
	EquipeRepository equipeRepository;

	@Autowired
	UtilisateurRepository utilisateurRepository;

	public CompositionDTO mapCompositionToDTO(Composition composition) {
		CompositionDTO compositionDTO = new CompositionDTO();

		compositionDTO.setIdComposition(composition.getIdComposition());
		compositionDTO.setLibelleEquipe(composition.getEquipe().getLibelle());
		compositionDTO.setLoginUtilisateur(composition.getUtilisateur().getLogin());

		return compositionDTO;

	}

	public ResponseEntity<List<CompositionDTO>> getCompositions() {
		Iterable<Composition> compositions = compositionRepository.findAll();

		if (compositions.iterator().hasNext()) {
			List<CompositionDTO> compositionsDTO = new ArrayList<>();

			for (Composition composition : compositions) {
				CompositionDTO compositionDTO = this.mapCompositionToDTO(composition);
				compositionsDTO.add(compositionDTO);
			}

			return ResponseEntity.ok(compositionsDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<List<CompositionDTO>> getCompositionsByEquipe(int id) {
		Optional<Equipe> equipe = equipeRepository.findById(id);
		Iterable<Composition> compositions = compositionRepository.findByEquipe(equipe.get());

		List<CompositionDTO> compositionsDTO = new ArrayList<>();

		for (Composition composition : compositions) {
			CompositionDTO compositionDTO = mapCompositionToDTO(composition);
			compositionsDTO.add(compositionDTO);

		}
		return ResponseEntity.ok(compositionsDTO);
	}

	public ResponseEntity<CompositionDTO> create(CompositionDTO compositionDTO) {

		Composition compositionACreer = new Composition();

		Equipe equipe = equipeRepository.findByLibelle(compositionDTO.getLibelleEquipe()).get();
		Utilisateur utilisateur = utilisateurRepository.findByLogin(compositionDTO.getLoginUtilisateur()).get();

		compositionACreer.setEquipe(equipe);
		compositionACreer.setUtilisateur(utilisateur);

		compositionRepository.save(compositionACreer);

		CompositionDTO compositionACreerDTO = this.mapCompositionToDTO(compositionACreer);

		return ResponseEntity.ok(compositionACreerDTO);

	}

	public ResponseEntity<CompositionDTO> update(CompositionDTO compositionDTO, int id) {

		Optional<Composition> compositionAModifierOptional = compositionRepository.findById(id);

		if (compositionAModifierOptional.isPresent()) {

			Composition compositionAModifier = compositionAModifierOptional.get();

			Equipe equipe = equipeRepository.findByLibelle(compositionDTO.getLibelleEquipe()).get();
			Utilisateur utilisateur = utilisateurRepository.findByLogin(compositionDTO.getLoginUtilisateur()).get();

			compositionAModifier.setEquipe(equipe);
			compositionAModifier.setUtilisateur(utilisateur);

			compositionRepository.save(compositionAModifier);

			CompositionDTO compositionAModifierDTO = this.mapCompositionToDTO(compositionAModifier);

			return ResponseEntity.ok(compositionAModifierDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}
