package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.UtilisateurDTO;
import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Tache;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.SiteRepository;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class UtilisateurService {
	
	@Autowired
	UtilisateurRepository utilisateurRepository;

	@Autowired
	SiteRepository siteRepository;
	
	public UtilisateurDTO mapUtilisateurToDTO(Utilisateur utilisateur) {
		
		UtilisateurDTO utilisateurDTO = new UtilisateurDTO();

		List<List<String>> listCompositions = new ArrayList<>();

		List<List<String>> listTaches = new ArrayList<>();

		List<List<String>> listEquipes = new ArrayList<>();

		utilisateurDTO.setIdUtilisateur(utilisateur.getIdUtilisateur());
		utilisateurDTO.setNomUtilisateur(utilisateur.getNomUtilisateur());
		utilisateurDTO.setPrenomUtilisateur(utilisateur.getPrenomUtilisateur());
		utilisateurDTO.setDateNaissance(utilisateur.getDateNaissance());
		utilisateurDTO.setLogin(utilisateur.getLogin());
		utilisateurDTO.setMail(utilisateur.getMail());
		utilisateurDTO.setActif(utilisateur.isActif());

		if (utilisateur.getSite() != null){
			utilisateurDTO.setNomSite(utilisateur.getSite().getNomSite());
		}
		if (utilisateur.getTypeUtilisateur() != null){
			utilisateurDTO.setLibelleTypeUtilisateur(utilisateur.getTypeUtilisateur().getLibelle());
		}
		if (utilisateur.getListTaches() != null) {
			for (Tache tache : utilisateur.getListTaches()) {
				List<String> tacheObject = new ArrayList<>();
				tacheObject.add(String.valueOf(tache.getIdTache()));
				tacheObject.add(tache.getNomTache());
				listTaches.add(tacheObject);
			}
			utilisateurDTO.setListTaches(listTaches);
		}
		if (utilisateur.getListEquipes() != null) {
			for (Equipe equipe : utilisateur.getListEquipes()) {
				List<String> equipeObject = new ArrayList<>();
				equipeObject.add(String.valueOf(equipe.getIdEquipe()));
				equipeObject.add(equipe.getLibelle());
				listEquipes.add(equipeObject);
			}
			utilisateurDTO.setListEquipes(listEquipes);
		}
		if (utilisateur.getListCompositions() != null) {
			for (Composition composition : utilisateur.getListCompositions()) {
				List<String> compositionObject = new ArrayList<>();
				compositionObject.add(String.valueOf(composition.getIdComposition()));
				compositionObject.add(composition.getEquipe().getLibelle());
				compositionObject.add(composition.getUtilisateur().getNomUtilisateur());
				listCompositions.add(compositionObject);
			}
			utilisateurDTO.setListCompositions(listCompositions);
		}

		return utilisateurDTO;
	}

	public ResponseEntity<List<UtilisateurDTO>> getUtilisateurs() {
        
		Iterable<Utilisateur> utilisateurs = utilisateurRepository.findAll();

		if (utilisateurs.iterator().hasNext()) {
			List<UtilisateurDTO> utilisateursDTO = new ArrayList<>();

			for (Utilisateur utilisateur: utilisateurs) {
				UtilisateurDTO utilisateurDTO = this.mapUtilisateurToDTO(utilisateur);
				utilisateursDTO.add(utilisateurDTO);
			}

			return ResponseEntity.ok(utilisateursDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

    }

	public ResponseEntity<UtilisateurDTO> getUtilisateurById(int id) {
        
		Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);

		if (utilisateurChoisi.isPresent()) {
				UtilisateurDTO utilisateurChoisiDTO = this.mapUtilisateurToDTO(utilisateurChoisi.get());
				return ResponseEntity.ok(utilisateurChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

    }

	public ResponseEntity<List<UtilisateurDTO>> getUtilisateursBySite(String nomSite) {
		Iterable<Utilisateur> utilisateursChoisis = utilisateurRepository.findBySite(nomSite);
		
		if (utilisateursChoisis.iterator().hasNext()) {
			List<UtilisateurDTO> utilisateursChoisisDTO = new ArrayList<>();
			
			for (Utilisateur utilisateurChoisi : utilisateursChoisis) {
				UtilisateurDTO utilisateurChoisiDTO = this.mapUtilisateurToDTO(utilisateurChoisi);
				utilisateursChoisisDTO.add(utilisateurChoisiDTO);
			}
			return ResponseEntity.ok(utilisateursChoisisDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByNom(String nom) {
        Iterable<Utilisateur> utilisateursChoisis = utilisateurRepository.findByNom(nom);
		
		if (utilisateursChoisis.iterator().hasNext()) {
			List<UtilisateurDTO> utilisateursChoisisDTO = new ArrayList<>();
			
			for (Utilisateur utilisateurChoisi : utilisateursChoisis) {
				UtilisateurDTO utilisateurChoisiDTO = this.mapUtilisateurToDTO(utilisateurChoisi);
				utilisateursChoisisDTO.add(utilisateurChoisiDTO);
			}
			return ResponseEntity.ok(utilisateursChoisisDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
    }

    public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByTypeUtilisateur(String libelleTypeUtilisateur) {
        Iterable<Utilisateur> utilisateursChoisis = utilisateurRepository.findByTypeUtilisateur(libelleTypeUtilisateur);
		
		if (utilisateursChoisis.iterator().hasNext()) {
			List<UtilisateurDTO> utilisateursChoisisDTO = new ArrayList<>();
			
			for (Utilisateur utilisateurChoisi : utilisateursChoisis) {
				UtilisateurDTO utilisateurChoisiDTO = this.mapUtilisateurToDTO(utilisateurChoisi);
				utilisateursChoisisDTO.add(utilisateurChoisiDTO);
			}
			return ResponseEntity.ok(utilisateursChoisisDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
    }

	public ResponseEntity<UtilisateurDTO> createUtilisateur(UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateurACreer = new Utilisateur();

		utilisateurACreer.setNomUtilisateur(utilisateurDTO.getNomUtilisateur());
		utilisateurACreer.setPrenomUtilisateur(utilisateurDTO.getPrenomUtilisateur());
		utilisateurACreer.setDateNaissance(utilisateurDTO.getDateNaissance());
		utilisateurACreer.setLogin(utilisateurDTO.getLogin());
		utilisateurACreer.setMail(utilisateurDTO.getMail());
		utilisateurACreer.setActif(utilisateurDTO.isActif());

		utilisateurRepository.save(utilisateurACreer);

		UtilisateurDTO utilisateurACreerDTO  = this.mapUtilisateurToDTO(utilisateurACreer);

		return ResponseEntity.ok(utilisateurACreerDTO);
    }

	public ResponseEntity<UtilisateurDTO> updateUtilisateur(UtilisateurDTO utilisateurDTO, int id) {
        Utilisateur utilisateurAModifier = utilisateurRepository.findById(id).get();
		
		utilisateurAModifier.setNomUtilisateur(utilisateurDTO.getNomUtilisateur());
		utilisateurAModifier.setPrenomUtilisateur(utilisateurDTO.getPrenomUtilisateur());
		utilisateurAModifier.setDateNaissance(utilisateurDTO.getDateNaissance());
		utilisateurAModifier.setLogin(utilisateurDTO.getLogin());
		utilisateurAModifier.setMail(utilisateurDTO.getMail());
		utilisateurAModifier.setActif(utilisateurDTO.isActif());

		utilisateurRepository.save(utilisateurAModifier);

		UtilisateurDTO utilisateurAModifierDTO  = this.mapUtilisateurToDTO(utilisateurAModifier);

		return ResponseEntity.ok(utilisateurAModifierDTO);
    }

    public ResponseEntity<UtilisateurDTO> deleteUtilisateur(int id) {
        Utilisateur utilisateurASupprimer = utilisateurRepository.findById(id).get();


		//TODO : A revoir pour respecter les contraintes de clé étrangères

		/*utilisateurASupprimer.setListTaches(new ArrayList<>());
		utilisateurASupprimer.setListCompositions(new ArrayList<>());
		utilisateurASupprimer.setListEquipes(new ArrayList<>());
		utilisateurRepository.save(utilisateurASupprimer);*/

		/*for (Tache tache : utilisateurASupprimer.getListTaches()) {
			utilisateurASupprimer.getListTaches().remove(tache);
			utilisateurRepository.save(utilisateurASupprimer);
		}
		for (Equipe equipe : utilisateurASupprimer.getListEquipes()) {
			utilisateurASupprimer.getListEquipes().remove(equipe);
			utilisateurRepository.save(utilisateurASupprimer);
		}
		for (Composition composition : utilisateurASupprimer.getListCompositions()) {
			utilisateurASupprimer.getListCompositions().remove(composition);
		}*/

		UtilisateurDTO utilisateurASupprimerDTO = this.mapUtilisateurToDTO(utilisateurASupprimer);

		utilisateurRepository.delete(utilisateurASupprimer);

		return ResponseEntity.ok(utilisateurASupprimerDTO);
    }
}
