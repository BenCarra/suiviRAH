package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.EquipeDTO;
import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.EquipeRepository;

@Service
public class EquipeService {
	
	@Autowired
	EquipeRepository equipeRepository;
	
	public EquipeDTO mapEquipeToDTO(Equipe equipe) {
		EquipeDTO equipeDTO = new EquipeDTO();

		List<List<String>> listUtilisateurs = new ArrayList<>();

		List<List<String>> listCompositions = new ArrayList<>();
		
		equipeDTO.setIdEquipe(equipe.getIdEquipe());
		equipeDTO.setLibelle(equipe.getLibelle());

		if (equipe.getListUtilisateurs() != null) {
			for (Utilisateur utilisateur : equipe.getListUtilisateurs()) {
				List<String> utilisateurObject = new ArrayList<>();
				utilisateurObject.add(String.valueOf(utilisateur.getIdUtilisateur()));
				utilisateurObject.add(utilisateur.getPrenomUtilisateur());
				utilisateurObject.add(utilisateur.getNomUtilisateur());
				listUtilisateurs.add(utilisateurObject);
			}
			equipeDTO.setListUtilisateurs(listUtilisateurs);
		}

		if (equipe.getListCompositions() != null) {
			for (Composition composition : equipe.getListCompositions()) {
				List<String> compositionObject = new ArrayList<>();
				compositionObject.add(String.valueOf(composition.getIdComposition()));
				compositionObject.add(composition.getEquipe().getLibelle());
				compositionObject.add(composition.getUtilisateur().getPrenomUtilisateur());
				compositionObject.add(composition.getUtilisateur().getNomUtilisateur());
				listCompositions.add(compositionObject);
			}
			equipeDTO.setListCompositions(listCompositions);
		}
		
		return equipeDTO;
	}

	public ResponseEntity<List<EquipeDTO>> getEquipes() {
		Iterable<Equipe> equipes = equipeRepository.findAll();

		if (equipes.iterator().hasNext()) {
			List<EquipeDTO> equipesDTO = new ArrayList<>();

			for (Equipe equipe : equipes) {
				EquipeDTO equipeDTO = this.mapEquipeToDTO(equipe);
				equipesDTO.add(equipeDTO);
			}

			return ResponseEntity.ok(equipesDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<EquipeDTO> getEquipeById(int id) {
		Optional<Equipe> equipeChoisie = equipeRepository.findById(id);

		if (equipeChoisie.isPresent()) {
			EquipeDTO equipeChoisieDTO = this.mapEquipeToDTO(equipeChoisie.get());
			return ResponseEntity.ok(equipeChoisieDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

		
	}

	public ResponseEntity<List<EquipeDTO>> getEquipesByLibelle(String libelle) {
		Iterable<Equipe> equipesChoisies = equipeRepository.findByLibelle(libelle);

		if (equipesChoisies.iterator().hasNext()) {
			List<EquipeDTO> equipesChoisiesDTO = new ArrayList<>();

			for (Equipe equipeChoisie : equipesChoisies) {
				EquipeDTO equipeDTO = this.mapEquipeToDTO(equipeChoisie);
				equipesChoisiesDTO.add(equipeDTO);
			}

			return ResponseEntity.ok(equipesChoisiesDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<EquipeDTO> createEquipe(EquipeDTO equipeDTO) {
		Equipe equipeACreer = new Equipe();

		equipeACreer.setLibelle(equipeDTO.getLibelle());

		equipeRepository.save(equipeACreer);

		EquipeDTO equipeACreerDTO = this.mapEquipeToDTO(equipeACreer);

		return ResponseEntity.ok(equipeACreerDTO);
	}

	public ResponseEntity<EquipeDTO> updateEquipe(EquipeDTO equipeDTO, int id) {
		Equipe equipeAModifier = equipeRepository.findById(id).get();

		equipeAModifier.setLibelle(equipeDTO.getLibelle());

		equipeRepository.save(equipeAModifier);

		EquipeDTO equipeAModifierDTO = this.mapEquipeToDTO(equipeAModifier);

		return ResponseEntity.ok(equipeAModifierDTO);
	}

	public ResponseEntity<EquipeDTO> deleteEquipe(int id) {
		Equipe equipeASupprimer = equipeRepository.findById(id).get();

		EquipeDTO equipeASupprimerDTO = this.mapEquipeToDTO(equipeASupprimer);

		equipeRepository.delete(equipeASupprimer);

		return ResponseEntity.ok(equipeASupprimerDTO);
	}

}
