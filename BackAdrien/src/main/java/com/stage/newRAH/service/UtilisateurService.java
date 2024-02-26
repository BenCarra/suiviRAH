package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.UtilisateurDTO;
import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Site;
import com.stage.newRAH.model.Tache;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.CompositionRepository;
import com.stage.newRAH.repository.EquipeRepository;
import com.stage.newRAH.repository.SiteRepository;
import com.stage.newRAH.repository.TacheRepository;
import com.stage.newRAH.repository.TypeUtilisateurRepository;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class UtilisateurService {
	
	@Autowired
	UtilisateurRepository utilisateurRepository;

	@Autowired
	SiteRepository siteRepository;

	@Autowired
	TypeUtilisateurRepository typeUtilisateurRepository;

	@Autowired
	TacheRepository tacheRepository;

	@Autowired
	EquipeRepository equipeRepository;

	@Autowired
	CompositionRepository compositionRepository;
	
	public UtilisateurDTO mapUtilisateurToDTO(Utilisateur utilisateur) {
		
		UtilisateurDTO utilisateurDTO = new UtilisateurDTO();

		List<List<String>> listCompositions = new ArrayList<>();

		List<List<String>> listTaches = new ArrayList<>();

		List<List<String>> listEquipes = new ArrayList<>();

		
		utilisateurDTO.setIdUtilisateur(utilisateur.getIdUtilisateur());
		utilisateurDTO.setNomUtilisateur(utilisateur.getNomUtilisateur());
		utilisateurDTO.setPrenomUtilisateur(utilisateur.getPrenomUtilisateur());
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

		//utilisateurDTO.setLibelleEquipe(utilisateur.getListEquipes());
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

	public ResponseEntity<List<UtilisateurDTO>> getUtilisateursBySite(int id) {
		Optional<Site> siteChoisi = siteRepository.findById(id);
		
		if (siteChoisi.isPresent()) {
			List<Utilisateur> utilisateurs = siteChoisi.get().getListUtilisateurs();
			List<UtilisateurDTO> utilisateursDTO = new ArrayList<>();
			
			for (Utilisateur utilisateur : utilisateurs) {
				UtilisateurDTO utilisateurDTO = this.mapUtilisateurToDTO(utilisateur);
				utilisateursDTO.add(utilisateurDTO);
			}
			return ResponseEntity.ok(utilisateursDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<UtilisateurDTO> updateUtilisateur(UtilisateurDTO utilisateurDTO, int id) {
        Utilisateur utilisateurAModifier = utilisateurRepository.findById(id).get();

		
		utilisateurAModifier.setNomUtilisateur(utilisateurDTO.getNomUtilisateur());
		utilisateurAModifier.setPrenomUtilisateur(utilisateurDTO.getPrenomUtilisateur());
		utilisateurAModifier.setLogin(utilisateurDTO.getLogin());
		utilisateurAModifier.setMail(utilisateurDTO.getMail());
		utilisateurAModifier.setActif(utilisateurDTO.isActif());
		// TODO : Récupérer site par id utilisateur, récupérer type utilisateur par utilisateur
		//utilisateurAModifier.setSite(...);
		//utilisateurAModifier.setTypeUtilisateur(...);

		utilisateurRepository.save(utilisateurAModifier);

		UtilisateurDTO utilisateurAModifierDTO  = this.mapUtilisateurToDTO(utilisateurAModifier);

		return ResponseEntity.ok(utilisateurAModifierDTO);
    }

    public ResponseEntity<UtilisateurDTO> deleteUtilisateur(int id) {
        Utilisateur utilisateurASupprimer = utilisateurRepository.findById(id).get();

		UtilisateurDTO utilisateurASupprimerDTO = this.mapUtilisateurToDTO(utilisateurASupprimer);

		utilisateurRepository.deleteById(id);

		return ResponseEntity.ok(utilisateurASupprimerDTO);
    }

    

    
}
