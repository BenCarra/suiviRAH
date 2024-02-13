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
import com.stage.newRAH.model.TypeTache;
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
		
		tacheDTO.setIdTache(tache.getIdTache());
		tacheDTO.setNomTache(tache.getNomTache());
		tacheDTO.setDebutTache(tache.getDebutTache());
		tacheDTO.setFinTache(tache.getFinTache());
		tacheDTO.setCommentaires(tache.getCommentaires());
		tacheDTO.setIdTypeTache(tache.getTypeTache().getIdTypeTache());
		tacheDTO.setIdProjet(tache.getProjet().getIdProjet());
		
		return tacheDTO;
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
		
	
	
	public ResponseEntity<TacheDTO> createTache(TacheDTO tacheDTO) {
		Tache nouvelleTache = new Tache();
		
		 // Récupération du type de tâche et du projet par leurs identifiants 
		 TypeTache typeTache = typeTacheRepository.findById(tacheDTO.getIdTypeTache()).orElse(null);
		 Projet projet = projetRepository.findById(tacheDTO.getIdProjet()).orElse(null);
		
		nouvelleTache.setNomTache(tacheDTO.getNomTache());
		nouvelleTache.setDebutTache(tacheDTO.getDebutTache());
		nouvelleTache.setFinTache(tacheDTO.getFinTache());
		nouvelleTache.setCommentaires(tacheDTO.getCommentaires());
		nouvelleTache.setTypeTache(typeTache);
		nouvelleTache.setProjet(projet);
		
		// Enregistrement de la nouvelle tache dans la base de données
		Tache tacheSauvegardee = tacheRepository.save(nouvelleTache);
		
		TacheDTO tacheSauvegardeeDTO = mapTacheToDTO(tacheSauvegardee);
		
		return ResponseEntity.ok(tacheSauvegardeeDTO);
	}
	
	
    

}
