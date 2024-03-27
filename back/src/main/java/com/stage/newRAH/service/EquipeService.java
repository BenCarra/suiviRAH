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

	@Autowired
	CompositionService compositionService;
	
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

	public ResponseEntity<EquipeDTO> getEquipesByLibelle(String libelle) {
		Optional<Equipe> equipeChoisie = equipeRepository.findByLibelle(libelle);

		if (equipeChoisie.isPresent()) {
			EquipeDTO equipeDTO = this.mapEquipeToDTO(equipeChoisie.get());
			return ResponseEntity.ok(equipeDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<EquipeDTO> createEquipe(EquipeDTO equipeDTO) {
		Equipe equipeACreer = new Equipe();

		equipeACreer.setLibelle(equipeDTO.getLibelle());

		/* On remplit la liste des utilisateurs de l'équipe à créer côté équipe
		et à chacun de ses membres, on affecte cette équipe afin d'afficher côté utilisateur la liste des équipes auxquelles un utilisateur appartient */

		// Récupération des informations utilisateurs du formulaire de création
		List<List<String>> utilisateursString = equipeDTO.getListUtilisateurs();
		// Création de la liste des informations utilisateurs de l'équipe créée à envoyer au front-end		
		List<Utilisateur> utilisateurs = new ArrayList<>();


		// TODO : Voir si on peut recréer une équipe sans créer une nouvelle composition 

		for (List<String> utilisateurString : utilisateursString) {
			Utilisateur utilisateur = utilisateurRepository.findById(Integer.parseInt(utilisateurString.get(0))).get();
			List<Equipe> equipes = utilisateur.getListEquipes();
			// Ajout de l'équipe créée dans la liste des équipes associées à l'utilisateur récupéré
			equipes.add(equipeACreer);
			// Ajout de l'utilisateur dans la liste des utilisateurs de l'équipe créée
			utilisateurs.add(utilisateur);
		}


		equipeACreer.setListUtilisateurs(utilisateurs);

		equipeRepository.save(equipeACreer);

		/*for (List<String> compositionString : compositionsString) {
			ResponseEntity<CompositionDTO> compositionCreee = compositionService.create(new CompositionDTO(Integer.parseInt(compositionString.get(0)), equipeACreer.getIdEquipe(), Integer.parseInt(compositionString.get(2))));

			Composition composition = new Composition();

			Equipe equipeComposition = equipeRepository.findById(compositionCreee.getBody().getIdEquipe()).get();
			Utilisateur utilisateurComposition = utilisateurRepository.findById(compositionCreee.getBody().getIdUtilisateur()).get();

			composition.setIdComposition(0);
			composition.setEquipe(equipeComposition);
			composition.setUtilisateur(utilisateurComposition);
			compositions.add(composition);
		}

		equipeACreer.setListCompositions(compositions);

		equipeRepository.save(equipeACreer);*/

		EquipeDTO equipeACreerDTO = this.mapEquipeToDTO(equipeACreer);

		return ResponseEntity.ok(equipeACreerDTO);
	}

	// TODO : Régler le problème du lien entre projet et composition (éventuellement modifier le lien côté projet) + 
	// composition effacée puis recréée quand modification équipe (problème d'idComposition qui s'incrémente quand on modifie l'équipe)
	public ResponseEntity<EquipeDTO> updateEquipe(EquipeDTO equipeDTO, int id) {
		Optional<Equipe> equipeAModifierOptional = equipeRepository.findById(id);

		if (equipeAModifierOptional.isPresent()){
			Equipe equipeAModifier = equipeAModifierOptional.get();

			List<List<String>> utilisateursString = equipeDTO.getListUtilisateurs();
			List<Utilisateur> utilisateurs = new ArrayList<>();

			equipeAModifier.setLibelle(equipeDTO.getLibelle());

			for (List<String> utilisateurString : utilisateursString) {
				Utilisateur utilisateur = utilisateurRepository.findById(Integer.parseInt(utilisateurString.get(0))).get();
				List<Equipe> equipes = utilisateur.getListEquipes();

				if (equipes.contains(equipeAModifier)) {
					int indexEquipeAModifier = equipes.indexOf(equipeAModifier);
					equipes.get(indexEquipeAModifier).setLibelle(equipeDTO.getLibelle());
				}

				utilisateurs.add(utilisateur);
			}

			equipeAModifier.setListUtilisateurs(utilisateurs);

			//On modifie le lien entre composition et projet 
			List<Composition> compositions = equipeAModifier.getListCompositions();
			Iterable<Projet> projets =  projetRepository.findAll();

			for (Composition composition : compositions) {
;
				for (Projet projet : projets) {
					if (projet.getListCompositions().contains(composition)) {

						Projet oldProjet = projet;

						int indexCompositionAModifier = projet.getListCompositions().indexOf(composition);
						projet.getListCompositions().get(indexCompositionAModifier).setEquipe(equipeAModifier);

						List<Projet> projetsComposition = composition.getListProjets();
						//composition.setEquipe(equipeAModifier);
						projetsComposition.remove(oldProjet);
						projetsComposition.add(projet);

						projetRepository.save(projet);
					}
				}
				
			}

			equipeAModifier.setListCompositions(compositions);

			equipeRepository.save(equipeAModifier);

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
