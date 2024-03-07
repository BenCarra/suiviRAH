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
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.CompositionRepository;
import com.stage.newRAH.repository.EquipeRepository;
import com.stage.newRAH.repository.ProjetRepository;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class EquipeService {
	
	@Autowired
	EquipeRepository equipeRepository;

	@Autowired
	UtilisateurRepository utilisateurRepository;

	@Autowired
	CompositionRepository compositionRepository;

	@Autowired
	ProjetRepository projetRepository;
	
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

		/* On remplit la liste des utilisateurs de l'équipe à créer côté équipe
		et pour chacun de ses membres, on affecte cette équipe afin d'afficher côté utilisateur la liste des équipes auxquelles un membre appartient */
		List<List<String>> utilisateursString = equipeDTO.getListUtilisateurs();
		List<Utilisateur> utilisateurs = new ArrayList<>();

		// TODO : Voir si on peut recréer une équipe sans créer une nouvelle composition 

		for (List<String> utilisateurString : utilisateursString) {
			Utilisateur utilisateur = utilisateurRepository.findById(Integer.valueOf(utilisateurString.get(0))).get();
			List<Equipe> equipes = utilisateur.getListEquipes();
			equipes.add(equipeACreer);
			utilisateurs.add(utilisateur);
		}

		equipeACreer.setListUtilisateurs(utilisateurs);

		equipeRepository.save(equipeACreer);

		EquipeDTO equipeACreerDTO = this.mapEquipeToDTO(equipeACreer);

		return ResponseEntity.ok(equipeACreerDTO);
	}

	// TODO : Régler le problème du lien entre projet et composition (éventuellement modifier le lien côté projet)
	public ResponseEntity<EquipeDTO> updateEquipe(EquipeDTO equipeDTO, int id) {
		Optional<Equipe> equipeAModifierOptional = equipeRepository.findById(id);

		if (equipeAModifierOptional.isPresent()){
			Equipe equipeAModifier = equipeAModifierOptional.get();

			List<List<String>> utilisateursString = equipeDTO.getListUtilisateurs();
			List<Utilisateur> utilisateurs = new ArrayList<>();

			for (List<String> utilisateurString : utilisateursString) {
				Utilisateur utilisateur = utilisateurRepository.findById(Integer.valueOf(utilisateurString.get(0))).get();
				List<Equipe> equipes = utilisateur.getListEquipes();

				if (equipes.contains(equipeAModifier)) {
					equipes.remove(equipeAModifier);
					equipeAModifier.setLibelle(equipeDTO.getLibelle());
					equipes.add(equipeAModifier);
				}
				utilisateurs.add(utilisateur);
			}

			equipeAModifier.setListUtilisateurs(utilisateurs);

			equipeRepository.save(equipeAModifier);

			/* On modifie le lien entre composition et projet 
			List<Composition> compositions = equipeAModifier.getListCompositions();
			Iterable<Projet> projets = projetRepository.findAll();

			for (Composition composition : compositions) {
;
				Projet ancienProjet = null;
				Projet nouveauProjet = null;

				for (Projet projet : projets) {
					if (projet.getListCompositions().contains(composition)) {
						ancienProjet = projet;
						composition.setEquipe(equipeAModifier);
						projetRepository.save(projet);
						nouveauProjet = projet;
					}
				}

				List<Projet> projetsComposition = composition.getListProjets();
				projetsComposition.removeAll(projetsComposition);
				
			}*/

			EquipeDTO equipeAModifierDTO = this.mapEquipeToDTO(equipeAModifier);

			return ResponseEntity.ok(equipeAModifierDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

		
	}

	public ResponseEntity<EquipeDTO> deleteEquipe(int id) {
		Optional<Equipe> equipeASupprimerOptional = equipeRepository.findById(id);

		if (equipeASupprimerOptional.isPresent()) {

			Equipe equipeASupprimer = equipeASupprimerOptional.get();

			/* On supprime le lien entre composition et projet */
			List<Composition> compositions = equipeASupprimer.getListCompositions();
			Iterable<Projet> projets = projetRepository.findAll();

			for (Composition composition : compositions) {

				for (Projet projet : projets) {
					if (projet.getListCompositions().contains(composition)) {
						projet.getListCompositions().remove(composition);
						projetRepository.save(projet);
					}
				}

				List<Projet> projetsComposition = composition.getListProjets();
				projetsComposition.removeAll(projetsComposition);
			}

			EquipeDTO equipeASupprimerDTO = this.mapEquipeToDTO(equipeASupprimer);

			equipeRepository.delete(equipeASupprimer);

			return ResponseEntity.ok(equipeASupprimerDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

		
	}

}
