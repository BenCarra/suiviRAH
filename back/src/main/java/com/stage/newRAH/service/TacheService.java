package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TacheDTO;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.Tache;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.ProjetRepository;
import com.stage.newRAH.repository.TacheRepository;
import com.stage.newRAH.repository.TypeTacheRepository;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class TacheService {
	
	@Autowired
	TacheRepository tacheRepository;
	
	@Autowired
	TypeTacheRepository typeTacheRepository;
	
	@Autowired
	ProjetRepository projetRepository;
	

	@Autowired
	UtilisateurRepository utilisateurRepository;
	
	public TacheDTO mapTacheToDTO(Tache tache) {
		
		TacheDTO tacheDTO = new TacheDTO();
		List<Integer> listIdUtilisateurs = new ArrayList<>();
		
		tacheDTO.setIdTache(tache.getIdTache());
		tacheDTO.setNomTache(tache.getNomTache());
		tacheDTO.setDateTache(tache.getDateTache());
		tacheDTO.setDureeTache(tache.getDureeTache());
		tacheDTO.setCommentaires(tache.getCommentaires());
		if (tache.getTypeTache() != null) { 
			tacheDTO.setLibelleTypeTache(tache.getTypeTache().getLibelle());
		}
		if (tache.getProjet() != null) { 
			tacheDTO.setNomProjet(tache.getProjet().getNomProjet());
		}

		if (tache.getListUtilisateurs() != null) {
		for (Utilisateur utilisateur : tache.getListUtilisateurs()) {
			listIdUtilisateurs.add(utilisateur.getIdUtilisateur());
			}
		}

		tacheDTO.setListIdUtilisateurs(listIdUtilisateurs);
		
				
		return tacheDTO;
	}

	public ResponseEntity<List<TacheDTO>> getTaches() {
		Iterable<Tache> taches = tacheRepository.findAll();
		List<TacheDTO> tachesDTO = new ArrayList<>();
			
			for (Tache tache : taches) {
				TacheDTO tacheDTO = this.mapTacheToDTO(tache);
				tachesDTO.add(tacheDTO);
			}
			return ResponseEntity.ok(tachesDTO);

	}
	
	public ResponseEntity<TacheDTO> getTacheById(int id) {
		
        Optional<Tache> tacheChoisie = tacheRepository.findById(id);
        
        if (tacheChoisie.isPresent()) {

            TacheDTO tacheDTO = mapTacheToDTO(tacheChoisie.get());
            return ResponseEntity.ok(tacheDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	public ResponseEntity<List<TacheDTO>> getTachesByProjet(int id) {
		
		Optional<Projet> projetChoisi = projetRepository.findById(id);
		
		if (projetChoisi.isPresent()) {
			
			List<Tache> taches = projetChoisi.get().getListTaches();
			List<TacheDTO> tachesDTO = new ArrayList<>();
			
			for (Tache tache : taches) {
				TacheDTO tacheDTO = this.mapTacheToDTO(tache);
				tachesDTO.add(tacheDTO);
			}
			return ResponseEntity.ok(tachesDTO);
		} else {
			return ResponseEntity.notFound().build();
		}	
	}
	
	public ResponseEntity<List<TacheDTO>> getTachesByUtilisateur(int id) {
			
			Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);
			
			if (utilisateurChoisi.isPresent()) {
				
				List<Tache> taches = utilisateurChoisi.get().getListTaches();
				List<TacheDTO> tachesDTO = new ArrayList<>();
				
				for (Tache tache : taches) {
					TacheDTO tacheDTO = this.mapTacheToDTO(tache);
					tachesDTO.add(tacheDTO);
				}
				return ResponseEntity.ok(tachesDTO);
			} else {
				return ResponseEntity.notFound().build();
			}	
		}
	
}

