package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
		List<String> listNomsUtilisateurs = new ArrayList<>();
		
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
			listNomsUtilisateurs.add(utilisateur.getNomUtilisateur());
			}
		}

		tacheDTO.setListNomsUtilisateurs(listNomsUtilisateurs);
		
				
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
	
	public ResponseEntity<?> createTache(TacheDTO tacheDTO) {
		Tache nouvelleTache = new Tache();
		
		 // Récupération du type de tâche et du projet 
		 TypeTache typeTache = typeTacheRepository.findByLibelle(tacheDTO.getLibelleTypeTache());
		 Projet projet = projetRepository.findByNomProjet(tacheDTO.getNomProjet());

		 List<String> nomUtilisateurs = tacheDTO.getListNomsUtilisateurs();
		 List<Utilisateur> utilisateurs = new ArrayList<>();
		
		nouvelleTache.setNomTache(tacheDTO.getNomTache());
		nouvelleTache.setDateTache(tacheDTO.getDateTache());
		nouvelleTache.setDureeTache(tacheDTO.getDureeTache());
		nouvelleTache.setCommentaires(tacheDTO.getCommentaires());
		nouvelleTache.setTypeTache(typeTache);
		nouvelleTache.setProjet(projet);

		for (String nom : nomUtilisateurs) {
			// J'ajoute à chaque utilisateur la tache que je suis en train de créér
			// En résumé, je remplis la table "utilisateur_tache"
			Utilisateur utilisateur = utilisateurRepository.findByNomUtilisateur(nom);
			List<Tache> taches = utilisateur.getListTaches();
			taches.add(nouvelleTache);
			utilisateurs.add(utilisateur);
		}

		nouvelleTache.setListUtilisateurs(utilisateurs);
		
		// Enregistrement de la nouvelle tache dans la base de données
		Tache tacheSauvegardee = tacheRepository.save(nouvelleTache);
		
		TacheDTO tacheSauvegardeeDTO = mapTacheToDTO(tacheSauvegardee);
		
		String message = String.format("La tâche n° %s a bien été crée.", tacheSauvegardeeDTO.getIdTache());
        return ResponseEntity.ok(Map.of("message", message));
		// return ResponseEntity.ok(tacheSauvegardeeDTO);
	}

	public ResponseEntity<?> deleteTache(int idTache){
		Optional<Tache> tacheChoisie = tacheRepository.findById(idTache);
		
		if (tacheChoisie.isPresent()) {
			Tache tache = tacheChoisie.get();

			// Suppression des associations avec les utilisateurs
			for (Utilisateur utilisateur : tache.getListUtilisateurs()) {
				utilisateur.getListTaches().remove(tache);
				utilisateurRepository.save(utilisateur);
			} 

			// Une fois que j'ai supprimée la tâche aux utilisateurs je peux supprimer la tâche
			tacheRepository.delete(tache);

			String message = String.format("La tâche n° %s a bien été supprimée.", idTache);
        	return ResponseEntity.ok(Map.of("message", message));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<?> updateTache(int idTache, TacheDTO tacheDTO) {
		
		Optional<Tache> tacheAModifierOptional = tacheRepository.findById(tacheDTO.getIdTache());


		if (tacheAModifierOptional.isPresent()) {
			Tache tacheAModifier = tacheAModifierOptional.get();
		
		// Récupération du type de tâche et du projet 
		TypeTache typeTache = typeTacheRepository.findByLibelle(tacheDTO.getLibelleTypeTache());
		Projet projet = projetRepository.findByNomProjet(tacheDTO.getNomProjet());

		tacheAModifier.setDateTache(tacheDTO.getDateTache());
		tacheAModifier.setDureeTache(tacheDTO.getDureeTache());
		tacheAModifier.setProjet(projet);
		tacheAModifier.setTypeTache(typeTache);
		tacheAModifier.setCommentaires(tacheDTO.getCommentaires());
		tacheAModifier.setNomTache(tacheDTO.getNomTache());

		tacheRepository.save(tacheAModifier);

		String message = String.format("La tâche n° %s a bien été modifiée", tacheDTO.getIdTache());
        return ResponseEntity.ok(Map.of("message", message));
		
		} else {
			return ResponseEntity.notFound().build();
		}

	}
}
