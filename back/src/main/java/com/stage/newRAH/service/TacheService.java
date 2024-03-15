package com.stage.newRAH.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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


		@SuppressWarnings("deprecation") // j'ai dû mettre deprecation pour pouvoir utiliser getMonth() et getYear()
		public ResponseEntity<List<TacheDTO>> getTachesByUtilisateurByMonth(int id, int mois, int annee) {
			
			Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);
			
			if (utilisateurChoisi.isPresent()) {
				
				List<Tache> taches = utilisateurChoisi.get().getListTaches();
				List<Tache> tachesByMonth = new ArrayList<>();

				for (Tache tache: taches) {
					// getMonth() : Janvier : 0, février : 1 etc...
					// getYear() : currentYear + 1900
					if (tache.getDateTache().getMonth() == mois && tache.getDateTache().getYear() == annee -1900) {
						tachesByMonth.add(tache);
					}
				}

				List<TacheDTO> tachesByMonthDTO = new ArrayList<>();
				
				for (Tache tache : tachesByMonth) {
					TacheDTO tacheDTO = this.mapTacheToDTO(tache);
					tachesByMonthDTO.add(tacheDTO);
				}
				return ResponseEntity.ok(tachesByMonthDTO);
				
			} else {
				return ResponseEntity.notFound().build();
			}	
		}

		@SuppressWarnings("deprecation") // j'ai dû mettre deprecation pour pouvoir utiliser getMonth() et getYear()
		public ResponseEntity<List<TacheDTO>> getTachesByUtilisateurByWeek(int id, int numSemaine, int annee) {
			
			Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);
			
			if (utilisateurChoisi.isPresent()) {
				
				List<Tache> taches = utilisateurChoisi.get().getListTaches();
				List<Tache> tachesByWeek = new ArrayList<>();

				for (Tache tache: taches) {
					// getMonth() : Janvier : 0, février : 1 etc...
					// getYear() : currentYear + 1900
					if (tache.getWeekNumber(tache.getDateTache()) == numSemaine & tache.getDateTache().getYear() == annee - 1900) {
						tachesByWeek.add(tache);
					}
				}

				List<TacheDTO> tachesByWeekDTO = new ArrayList<>();
				
				for (Tache tache : tachesByWeek) {
					TacheDTO tacheDTO = this.mapTacheToDTO(tache);
					tachesByWeekDTO.add(tacheDTO);
				}
				return ResponseEntity.ok(tachesByWeekDTO);
				
			} else {
				return ResponseEntity.notFound().build();
			}	
		}		

	// J'ai testé pour la première fois java.time.LocalDate (et non plus les fonction dépréciées)
	public ResponseEntity<List<Double>> getListDureesTachesByUtilisateurByMonth(int id, int mois, int annee) {
		Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);
		
		// Initialiser la liste avec des zéros pour chaque jour du mois (31 jours)
		List<Double> listDureesParJour = new ArrayList<>();
		// En utilisant java.time, je peux calculer facilement le nombre de jours par mois
		YearMonth yearMonth = YearMonth.of(annee, mois + 1);
		int lengthOfMonth = yearMonth.lengthOfMonth();
		for (int i = 0; i < lengthOfMonth; i++) {
			listDureesParJour.add(0.0);
		}

		if (utilisateurChoisi.isPresent()) {
			List<Tache> taches = utilisateurChoisi.get().getListTaches();
			
			for (Tache tache : taches) {
				LocalDate dateTache = tache.getDateTache().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
				
				// Je vérifie que la tâche est dans le mois et l'année spécifiés
				if (dateTache.getMonthValue() == mois + 1 && dateTache.getYear() == annee) {
					// getDate() renvoie le jour du mois (1-31)
					int jourDuMois = dateTache.getDayOfMonth() - 1; // Les listes commencent à 0 
					// j'accède à l'élément d'index jourDuMois de la liste listDureesParJour
					double dureeActuelle = listDureesParJour.get(jourDuMois);
					// Ajouter la durée de la tâche actuelle à la durée totale pour ce jour
					// en remplaçant l'élément à l'index jour du mois par dureeActuelle + tache.getDureeTache()
					listDureesParJour.set(jourDuMois, dureeActuelle + tache.getDureeTache());
				}
			}			
			return ResponseEntity.ok(listDureesParJour);
		} else {
			return ResponseEntity.notFound().build();
		}
	}


		// public ResponseEntity<List<TacheDTO>> getTachesByUtilisateurByDay(int id, Date dateTache) {
			
		// 	Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);
			
		// 	if (utilisateurChoisi.isPresent()) {
				
		// 		List<Tache> taches = utilisateurChoisi.get().getListTaches();
		// 		List<Tache> tachesByDay = new ArrayList<>();

		// 		for (Tache tache: taches) {
		// 			if (tache.getDateTache().equals(dateTache)) {
		// 				tachesByDay.add(tache);
		// 			}
		// 		}

		// 		List<TacheDTO> tachesByDayDTO = new ArrayList<>();
				
		// 		for (Tache tache : tachesByDay) {
		// 			TacheDTO tacheDTO = this.mapTacheToDTO(tache);
		// 			tachesByDayDTO.add(tacheDTO);
		// 		}
		// 		return ResponseEntity.ok(tachesByDayDTO);
		// 	} else {
		// 		return ResponseEntity.notFound().build();
		// 	}	
		// }

		// @SuppressWarnings("deprecation")
		// public ResponseEntity<Double> getDureeTachesByUtilisateurByDay(int id, int jour, int mois, int annee) {
			
		// 	Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);
			
		// 	if (utilisateurChoisi.isPresent()) {
				
		// 		List<Tache> taches = utilisateurChoisi.get().getListTaches();
		// 		double dureeJournee = 0;

		// 		for (Tache tache: taches) {
		// 			Date dateTache = tache.getDateTache();
		// 			if (dateTache.getYear() == annee - 1900 &&
		// 				dateTache.getMonth() == mois &&
		// 				dateTache.getDate() == jour) {
		// 				dureeJournee += tache.getDureeTache();                        
        //     		} 
		// 		}
		// 			return ResponseEntity.ok(dureeJournee);
		// 			} else {
		// 				return ResponseEntity.notFound().build();
		// 	}	
		// }

	
	public ResponseEntity<?> createTache(TacheDTO tacheDTO) {
		Tache nouvelleTache = new Tache();
		
		 // Récupération du type de tâche et du projet 
		 TypeTache typeTache = typeTacheRepository.findByLibelle(tacheDTO.getLibelleTypeTache());
		 Projet projet = projetRepository.findByNomProjet(tacheDTO.getNomProjet());

		 List<Integer> idUtilisateurs = tacheDTO.getListIdUtilisateurs();
		 List<Utilisateur> utilisateurs = new ArrayList<>();
		
		nouvelleTache.setNomTache(tacheDTO.getNomTache());
		nouvelleTache.setDateTache(tacheDTO.getDateTache());
		nouvelleTache.setDureeTache(tacheDTO.getDureeTache());
		nouvelleTache.setCommentaires(tacheDTO.getCommentaires());
		nouvelleTache.setTypeTache(typeTache);
		nouvelleTache.setProjet(projet);

		for (Integer id : idUtilisateurs) {
			// J'ajoute à chaque utilisateur la tache que je suis en train de créér
			// En résumé, je remplis la table "utilisateur_tache"
			Utilisateur utilisateur = utilisateurRepository.findById(id).get();
			List<Tache> taches = utilisateur.getListTaches();
			taches.add(nouvelleTache);
			utilisateurs.add(utilisateur);
		}

		nouvelleTache.setListUtilisateurs(utilisateurs);
		
		// Enregistrement de la nouvelle tache dans la base de données
		Tache tacheSauvegardee = tacheRepository.save(nouvelleTache);
		
		String message = String.format("La tâche n° %s a bien été crée.", tacheSauvegardee.getIdTache());
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

	public ResponseEntity<?> duplicateTache(int idTache, TacheDTO tacheDTO) {
		Optional<Tache> tacheADupliquerOptional = tacheRepository.findById(tacheDTO.getIdTache());
	
		if (tacheADupliquerOptional.isPresent()) {
				
			// Récupération du type de tâche et du projet 
			TypeTache typeTache = typeTacheRepository.findByLibelle(tacheDTO.getLibelleTypeTache());
			Projet projet = projetRepository.findByNomProjet(tacheDTO.getNomProjet());

			List<Integer> idUtilisateurs = tacheDTO.getListIdUtilisateurs();
		 	List<Utilisateur> utilisateurs = new ArrayList<>();
	
			// Création d'une nouvelle tâche plutôt que de mettre à jour l'ancienne
			Tache nouvelleTache = new Tache();
			
			// Copie des propriétés
			nouvelleTache.setNomTache(tacheDTO.getNomTache());
			nouvelleTache.setCommentaires(tacheDTO.getCommentaires());
			nouvelleTache.setTypeTache(typeTache);
			nouvelleTache.setProjet(projet);
			nouvelleTache.setDureeTache(tacheDTO.getDureeTache());
			
			// Gestion de la date
			Date dateOriginale = tacheDTO.getDateTache();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(dateOriginale);

			// Si c'est un vendredi, je duplique à lundi (donc 3 jours plus tard)
			// sinon je duplique le lendemain
				if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY) {
					calendar.add(Calendar.DAY_OF_MONTH, 3); 
				} else {
					calendar.add(Calendar.DAY_OF_MONTH, 1); 
				}

			Date nouvelleDateUtil = calendar.getTime();
			java.sql.Date nouvelleDateSql = new java.sql.Date(nouvelleDateUtil.getTime());
			nouvelleTache.setDateTache(nouvelleDateSql);

			for (Integer id : idUtilisateurs) {
				// J'ajoute à chaque utilisateur la tache que je suis en train de créér
				// En résumé, je remplis la table "utilisateur_tache"
				Utilisateur utilisateur = utilisateurRepository.findById(id).get();
				List<Tache> taches = utilisateur.getListTaches();
				taches.add(nouvelleTache);
				utilisateurs.add(utilisateur);
			}
	
			nouvelleTache.setListUtilisateurs(utilisateurs);
	
			// Sauvegarde de la nouvelle tâche
			tacheRepository.save(nouvelleTache);
	
			String message = String.format("La tâche n° %s a bien été dupliquée", tacheDTO.getIdTache());
			return ResponseEntity.ok(Map.of("message", message));
	
		} else {
			return ResponseEntity.notFound().build();
		}
	}
			
	// public ResponseEntity<?> duplicateTache(int idTache) {
	// 	Optional<Tache> tacheADupliquerOptional = tacheRepository.findById(idTache);

	// 	if (tacheADupliquerOptional.isPresent()) {
	// 		Tache tacheADupliquer = tacheADupliquerOptional.get();

	// 		// Création de la tâche dupliquée
	// 		Tache tacheDupliquee = new Tache();

	// 		// Copie des propriétés de l'ancienne tâche vers la nouvelle
	// 		Date dateOriginale = tacheADupliquer.getDateTache();
	// 		Calendar calendar = Calendar.getInstance();
    //     	calendar.setTime(dateOriginale);
    //     	calendar.add(Calendar.DAY_OF_MONTH, 1); // Ajoute un jour à la date originale
	// 		Date nouvelleDateUtil = calendar.getTime(); // C'est un java.util.Date
	// 		// Conversion de java.util.Date en java.sql.Date
	// 		java.sql.Date nouvelleDateSql = new java.sql.Date(nouvelleDateUtil.getTime());

	// 		tacheDupliquee.setDateTache(nouvelleDateSql); // Définit la date de la nouvelle tâche
	// 		tacheDupliquee.setDureeTache(tacheADupliquer.getDureeTache());
	// 		tacheDupliquee.setProjet(tacheADupliquer.getProjet());
	// 		tacheDupliquee.setTypeTache(tacheADupliquer.getTypeTache());
	// 		tacheDupliquee.setCommentaires(tacheADupliquer.getCommentaires());
	// 		tacheDupliquee.setNomTache(tacheADupliquer.getNomTache());
			
	// 		List<Utilisateur> nouveauxUtilisateurs = new ArrayList<>();
	// 		for (Utilisateur utilisateur : tacheADupliquer.getListUtilisateurs()) {
	// 			nouveauxUtilisateurs.add(utilisateur);
	// 			System.out.println("utilisateur n° "+utilisateur.getIdUtilisateur());
	// 		}

	// 		tacheDupliquee.setListUtilisateurs(nouveauxUtilisateurs);

	// 		tacheRepository.save(tacheDupliquee);			
			
	// 		String message = String.format("La tâche n° %s a bien été dupliquée", tacheADupliquer.getIdTache());
    //     	return ResponseEntity.ok(Map.of("message", message));
		
	// 	} else {
	// 		return ResponseEntity.notFound().build();
	// 	}
	// }			
}

