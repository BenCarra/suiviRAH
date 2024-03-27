package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.dto.SuiviProjetDTO;
import com.stage.newRAH.model.Client;
import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Etat;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.RDS;
import com.stage.newRAH.model.SuiviProjet;
import com.stage.newRAH.model.Tache;
import com.stage.newRAH.model.TypeDefaut;
import com.stage.newRAH.model.TypeProjet;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.ClientRepository;
import com.stage.newRAH.repository.CompositionRepository;
import com.stage.newRAH.repository.EquipeRepository;
import com.stage.newRAH.repository.EtatRepository;
import com.stage.newRAH.repository.ProjetRepository;
import com.stage.newRAH.repository.RDSRepository;
import com.stage.newRAH.repository.TacheRepository;
import com.stage.newRAH.repository.TypeDefautRepository;
import com.stage.newRAH.repository.TypeProjetRepository;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class ProjetService {

	@Autowired
	ProjetRepository projetRepository;

	@Autowired
	CompositionRepository compositionRepository;

	@Autowired
	EquipeRepository equipeRepository;

	@Autowired
	UtilisateurRepository utilisateurRepository;

	@Autowired
	ClientRepository clientRepository;

	@Autowired
	TypeProjetRepository typeProjetRepository;

	@Autowired
	TypeDefautRepository typeDefautRepository;

	@Autowired
	EtatRepository etatRepository;

	@Autowired
	RDSRepository rdsRepository;

	@Autowired
	TacheRepository tacheRepository;

	public ProjetDTO mapProjetToDTO(Projet projet) {

		ProjetDTO projetDTO = new ProjetDTO();

		projetDTO.setIdProjet(projet.getIdProjet());
		projetDTO.setNomProjet(projet.getNomProjet());
		projetDTO.setJira(projet.getJira());
		projetDTO.setTechno(projet.getTechno());
		projetDTO.setDateDemande(projet.getDateDemande());
		projetDTO.setLivraisonSouhaitee(projet.getLivraisonSouhaitee());
		projetDTO.setLivraisonRevisee(projet.getLivraisonRevisee());
		projetDTO.setAffectationCDS(projet.getAffectationCDS());
		projetDTO.setPriseEnCompteCDS(projet.getPriseEnCompteCDS());
		projetDTO.setDateEstimation(projet.getDateEstimation());
		projetDTO.setDevisEstimation(projet.getDevisEstimation());
		projetDTO.setDontGarantie(projet.getDontGarantie());
		projetDTO.setDateFeuVert(projet.getDateFeuVert());
		projetDTO.setDateLivraison(projet.getDateLivraison());
		projetDTO.setMCO(projet.isMCO());
		projetDTO.setDatePassageMCO(projet.getDatePassageMCO());
		projetDTO.setDateSortieMCO(projet.getDateSortieMCO());
		projetDTO.setCommentaires(projet.getCommentaires());
		projetDTO.setNomClient(projet.getClient().getNomClient());
		projetDTO.setLibelleEtat(projet.getEtat().getLibelle());
		// Il faut gérer le cas où le type de défaut est nul
		if (projet.getTypeDefaut() != null) {
			projetDTO.setLibelleTypeDefaut(projet.getTypeDefaut().getLibelle());
		}
		projetDTO.setLibelleTypeProjet(projet.getTypeProjet().getLibelle());
		if (projet.getRds() != null) {
			List<String> rdsObject = new ArrayList<>();
			rdsObject.add(String.valueOf(projet.getRds().getIdRDS()));
			rdsObject.add(projet.getRds().getNom());
			rdsObject.add(projet.getRds().getDirection());
			rdsObject.add(projet.getRds().getService());
			projetDTO.setRds(rdsObject);
		}

		if (projet.getListTaches() != null) {
			List<List<String>> listTaches = new ArrayList<>();
			for (Tache tache : projet.getListTaches()) {
				List<String> tacheObject = new ArrayList<>();
				tacheObject.add(String.valueOf(tache.getIdTache()));
				tacheObject.add(tache.getNomTache());
				listTaches.add(tacheObject);
			}
			projetDTO.setListTaches(listTaches);
		}

		if (projet.getListCompositions() != null) {
			List<List<String>> listCompositions = new ArrayList<>();
			for (Composition composition : projet.getListCompositions()) {
				List<String> compositionObject = new ArrayList<>();
				compositionObject.add(String.valueOf(composition.getIdComposition()));
				compositionObject.add(composition.getEquipe().getLibelle());
				compositionObject.add(composition.getUtilisateur().getLogin());
				listCompositions.add(compositionObject);
			}
			projetDTO.setListCompositions(listCompositions);
		}

		return projetDTO;
	}

	public SuiviProjetDTO mapSuiviProjetToDTO(SuiviProjet suiviProjet) {

		SuiviProjetDTO suiviProjetDTO = new SuiviProjetDTO();

		suiviProjetDTO.setIdProjet(suiviProjet.getIdProjet());

		if (suiviProjet.getClient() != null) {
			suiviProjetDTO.setNomClient(suiviProjet.getClient().getNomClient());
		}

		suiviProjetDTO.setNomProjet(suiviProjet.getNomProjet());
		suiviProjetDTO.setDevisEstimation(suiviProjet.getDevisEstimation());

		if (suiviProjet.getEtat() != null) {
			suiviProjetDTO.setLibelleEtat(suiviProjet.getEtat().getLibelle());
		}

		suiviProjetDTO.setDureeTache(suiviProjet.getDureeTache());

		// Récupération de l'année à partir de la date
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(suiviProjet.getDateTache());
		suiviProjetDTO.setAnneeTache(calendar.get(Calendar.YEAR));

		return suiviProjetDTO;

	}

	public ResponseEntity<List<SuiviProjetDTO>> buildSuiviProjets(List<SuiviProjet> suiviPs,
			List<SuiviProjet> suiviPsDT, List<SuiviProjetDTO> suiviPsDTO) {

		if (suiviPs.iterator().hasNext() && suiviPsDT.iterator().hasNext()) {

			SuiviProjetDTO suiviPDTO = mapSuiviProjetToDTO(suiviPs.get(0));
			suiviPsDTO.add(suiviPDTO);

			for (int i = 1; i < suiviPs.size(); i++) {
				// Si l'idProjet du suivi Projet courant est différent de l'idProjet du suivi
				// projet précédent
				if (suiviPs.get(i).getIdProjet() != suiviPs.get(i - 1).getIdProjet()) {

					int j = 0;
					boolean trouve = false;
					// Recherche de l'idProjet du suivi projet correspondant parmi les idProjet des
					// suivis avec la durée totale
					while (!trouve && j < suiviPsDT.size()) {

						if ((suiviPsDT.get(j).getIdProjet() == suiviPs.get(i - 1).getIdProjet())) {
							SuiviProjetDTO suiviPDTO1 = mapSuiviProjetToDTO(suiviPsDT.get(j));
							suiviPDTO1.setAnneeTache(0); // On met 0 afin de mettre en évidence le cas avec durée totale
															// des tâches d'un suivi projet
							suiviPsDTO.add(suiviPDTO1);
							trouve = true;
						}
						j++;
					}

					// On ajoute ensuite le suivi projet courant
					SuiviProjetDTO suiviPDTO2 = mapSuiviProjetToDTO(suiviPs.get(i));
					suiviPsDTO.add(suiviPDTO2);

				} else {
					SuiviProjetDTO suiviPDTO3 = mapSuiviProjetToDTO(suiviPs.get(i));
					suiviPsDTO.add(suiviPDTO3);
				}
			}

			SuiviProjetDTO suiviPDTO4 = mapSuiviProjetToDTO(suiviPsDT.getLast());
			suiviPDTO4.setAnneeTache(0);
			suiviPsDTO.add(suiviPDTO4);

			return ResponseEntity.ok(suiviPsDTO);
		} else {
			return ResponseEntity.ofNullable(suiviPsDTO);
		}
	}

	public ResponseEntity<List<ProjetDTO>> getProjets() {
		Iterable<Projet> projets = projetRepository.findAll();
		List<ProjetDTO> projetsDTO = new ArrayList<>();

		for (Projet projet : projets) {
			ProjetDTO projetDTO = mapProjetToDTO(projet);
			projetsDTO.add(projetDTO);
		}

		return ResponseEntity.ok(projetsDTO);
	}

	public ResponseEntity<ProjetDTO> getProjetById(int id) {
		Optional<Projet> projetChoisi = projetRepository.findById(id);

		if (projetChoisi.isPresent()) {
			ProjetDTO projetChoisiDTO = mapProjetToDTO(projetChoisi.get());
			return ResponseEntity.ok(projetChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	public ResponseEntity<ProjetDTO> getProjetByNom(String nom) {
		Optional<Projet> projetChoisi = projetRepository.findByNom(nom);

		if (projetChoisi.isPresent()) {
			ProjetDTO projetChoisiDTO = mapProjetToDTO(projetChoisi.get());
			return ResponseEntity.ok(projetChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Je n'ai pas utilisé ResponseEntity comme retour afin de pouvoir réutiliser
	// facilement cette méthode dans getProjetsByEquipe
	public List<ProjetDTO> getProjetsByComposition(int id) {
		Optional<Composition> compositionChoisie = compositionRepository.findById(id);

		if (compositionChoisie.isPresent()) {
			List<Projet> projets = compositionChoisie.get().getListProjets();
			List<ProjetDTO> projetsDTO = new ArrayList<>();

			for (Projet projet : projets) {
				ProjetDTO projetDTO = mapProjetToDTO(projet);
				projetsDTO.add(projetDTO);
			}

			return (projetsDTO);
		} else {
			return null;
		}
	}

	public ResponseEntity<List<ProjetDTO>> getProjetsByEquipe(int id) {
		List<ProjetDTO> projetsDTO = new ArrayList<>();
		Equipe equipeChoisie = equipeRepository.findById(id).get();

		List<Composition> compositions = equipeChoisie.getListCompositions();

		for (Composition composition : compositions) {
			List<ProjetDTO> projetsDTOByCompo = getProjetsByComposition(composition.getIdComposition());

			for (ProjetDTO projetDTO : projetsDTOByCompo) {

				// Pour pouvoir utiliser la méthode contains, il faut redéfinir la méthode
				// equals (si deux projets ont le même id, ils sont identiques)
				if (!projetsDTO.contains(projetDTO)) {
					projetsDTO.add(projetDTO);
				}
			}
		}
		return ResponseEntity.ok(projetsDTO);

	}

	public ResponseEntity<List<ProjetDTO>> getProjetsByUtilisateur(int id) {
		List<ProjetDTO> projetsDTO = new ArrayList<>();
		Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(id);

		if (utilisateurChoisi.isPresent()) {

			List<Composition> compositions = utilisateurChoisi.get().getListCompositions();

			for (Composition composition : compositions) {
				List<ProjetDTO> projetsDTOByCompo = getProjetsByComposition(composition.getIdComposition());

				for (ProjetDTO projetDTO : projetsDTOByCompo) {

					// Pour pouvoir utiliser la méthode contains, il faut redéfinir la méthode
					// equals (si deux projets ont le même id, ils sont identiques)
					if (!projetsDTO.contains(projetDTO)) {
						projetsDTO.add(projetDTO);
					}
				}
			}
			return ResponseEntity.ok(projetsDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjets() {

		List<SuiviProjet> suiviProjets = projetRepository.getSuiviProjets();
		List<SuiviProjet> suiviProjetsDureeTotale = projetRepository.getSuiviProjetsDureeTotale();
		List<SuiviProjetDTO> suiviProjetsDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjets, suiviProjetsDureeTotale,
				suiviProjetsDTO);

		return response;

	}

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsNonTermines() {

		List<SuiviProjet> suiviProjetsNonTermines = projetRepository.getSuiviProjetsNonTermines();
		List<SuiviProjet> suiviProjetsNonTerminesDureeTotale = projetRepository.getSuiviProjetsNonTerminesDureeTotale();
		List<SuiviProjetDTO> suiviProjetsNonTerminesDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjetsNonTermines,
				suiviProjetsNonTerminesDureeTotale, suiviProjetsNonTerminesDTO);

		return response;

	}

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsTermines() {

		List<SuiviProjet> suiviProjetsTermines = projetRepository.getSuiviProjetsTermines();
		List<SuiviProjet> suiviProjetsTerminesDureeTotale = projetRepository.getSuiviProjetsTerminesDureeTotale();
		List<SuiviProjetDTO> suiviProjetsTerminesByClientDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjetsTermines,
				suiviProjetsTerminesDureeTotale, suiviProjetsTerminesByClientDTO);

		return response;
	}

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByClient(String nomClient) {

		List<SuiviProjet> suiviProjetsByClient = projetRepository.getSuiviProjetsByClient(nomClient);
		List<SuiviProjet> suiviProjetsByClientDureeTotale = projetRepository
				.getSuiviProjetsByClientDureeTotale(nomClient);
		List<SuiviProjetDTO> suiviProjetsByClientDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjetsByClient,
				suiviProjetsByClientDureeTotale, suiviProjetsByClientDTO);

		return response;

	}

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsNonTerminesByClient(String nomClient) {

		List<SuiviProjet> suiviProjetsNonTerminesByClient = projetRepository
				.getSuiviProjetsNonTerminesByClient(nomClient);
		List<SuiviProjet> suiviProjetsNonTerminesDureeTotale = projetRepository
				.getSuiviProjetsNonTerminesByClientDureeTotale(nomClient);
		List<SuiviProjetDTO> suiviProjetsNonTerminesByClientDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjetsNonTerminesByClient,
				suiviProjetsNonTerminesDureeTotale, suiviProjetsNonTerminesByClientDTO);

		return response;

	}

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsTerminesByClient(String nomClient) {

		List<SuiviProjet> suiviProjetsTerminesByClient = projetRepository.getSuiviProjetsTerminesByClient(nomClient);
		List<SuiviProjet> suiviProjetsTerminesDureeTotale = projetRepository
				.getSuiviProjetsTerminesByClientDureeTotale(nomClient);
		List<SuiviProjetDTO> suiviProjetsTerminesByClientDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjetsTerminesByClient,
				suiviProjetsTerminesDureeTotale, suiviProjetsTerminesByClientDTO);

		return response;

	}

	public ResponseEntity<ProjetDTO> createProjet(ProjetDTO projetDTO) {
		Projet projetACreer = new Projet();

		Client client = clientRepository.findByNom(projetDTO.getNomClient()).iterator().next();
		Etat etat = etatRepository.findByLibelle(projetDTO.getLibelleEtat()).get();
		TypeProjet typeProjet = typeProjetRepository.findByLibelle(projetDTO.getLibelleTypeProjet()).get();

		if (projetDTO.getLibelleTypeDefaut() != "") {
			TypeDefaut typeDefaut = typeDefautRepository.findByLibelle(projetDTO.getLibelleTypeDefaut()).get();
			projetACreer.setTypeDefaut(typeDefaut);
		} else {
			projetACreer.setTypeDefaut(null);
		}

		if (projetDTO.getRds() != null) {
			RDS rds = rdsRepository.findById(Integer.parseInt(projetDTO.getRds().get(0))).get();
			projetACreer.setRds(rds);
		} else {
			projetACreer.setRds(null);
		}

		if (projetDTO.getDatePassageMCO() != null) {
			projetACreer.setDatePassageMCO(projetDTO.getDatePassageMCO());
		} else {
			projetACreer.setDatePassageMCO(null);
		}

		if (projetDTO.getDateSortieMCO() != null) {
			projetACreer.setDateSortieMCO(projetDTO.getDateSortieMCO());
		} else {
			projetACreer.setDateSortieMCO(null);
		}

		projetACreer.setNomProjet(projetDTO.getNomProjet());
		projetACreer.setJira(projetDTO.getJira());
		projetACreer.setTechno(projetDTO.getTechno());
		projetACreer.setDateDemande(projetDTO.getDateDemande());
		projetACreer.setLivraisonSouhaitee(projetDTO.getLivraisonSouhaitee());
		projetACreer.setLivraisonRevisee(projetDTO.getLivraisonRevisee());
		projetACreer.setAffectationCDS(projetDTO.getAffectationCDS());
		projetACreer.setPriseEnCompteCDS(projetDTO.getPriseEnCompteCDS());
		projetACreer.setDateEstimation(projetDTO.getDateEstimation());
		projetACreer.setDevisEstimation(projetDTO.getDevisEstimation());
		projetACreer.setDontGarantie(projetDTO.getDontGarantie());
		projetACreer.setDateFeuVert(projetDTO.getDateFeuVert());
		projetACreer.setDateLivraison(projetDTO.getDateLivraison());
		projetACreer.setMCO(projetDTO.isMCO());
		projetACreer.setCommentaires(projetDTO.getCommentaires());
		projetACreer.setClient(client);
		projetACreer.setEtat(etat);
		projetACreer.setTypeProjet(typeProjet);

		List<List<String>> compositionsString = projetDTO.getListCompositions();
		List<Composition> compositions = new ArrayList<>();

		for (List<String> compositionString : compositionsString) {
			int idComposition = Integer.parseInt(compositionString.get(0));
			Composition composition = compositionRepository.findById(idComposition).get();
			List<Projet> projets = composition.getListProjets();
			projets.add(projetACreer);
			compositions.add(composition);
		}

		projetACreer.setListCompositions(compositions);

		Projet projetSauvegarde = projetRepository.save(projetACreer);

		ProjetDTO projetSauvegardeDTO = mapProjetToDTO(projetSauvegarde);

		return ResponseEntity.ok(projetSauvegardeDTO);
	}

	public ResponseEntity<ProjetDTO> updateProjet(ProjetDTO projetDTO, int id) {
		Optional<Projet> projetAModifierOptional = projetRepository.findById(id);

		if (projetAModifierOptional.isPresent()) {
			Projet projetAModifier = projetAModifierOptional.get();
			Client client = clientRepository.findByNom(projetDTO.getNomClient()).iterator().next();
			Etat etat = etatRepository.findByLibelle(projetDTO.getLibelleEtat()).get();
			TypeProjet typeProjet = typeProjetRepository.findByLibelle(projetDTO.getLibelleTypeProjet()).get();

			Projet projetAModifierOld = projetAModifier;

			if (projetDTO.getLibelleTypeDefaut() != "") {
				TypeDefaut typeDefaut = typeDefautRepository.findByLibelle(projetDTO.getLibelleTypeDefaut()).get();
				projetAModifier.setTypeDefaut(typeDefaut);
			} else {
				projetAModifier.setTypeDefaut(null);
			}

			if (projetDTO.getRds() != null) {
				RDS rds = rdsRepository.findById(Integer.parseInt(projetDTO.getRds().get(0))).get();
				projetAModifier.setRds(rds);
			} else {
				projetAModifier.setRds(null);
			}

			if (projetDTO.getDatePassageMCO() != null) {
				projetAModifier.setDatePassageMCO(projetDTO.getDatePassageMCO());
			} else {
				projetAModifier.setDatePassageMCO(null);
			}

			if (projetDTO.getDateSortieMCO() != null) {
				projetAModifier.setDateSortieMCO(projetDTO.getDateSortieMCO());
			} else {
				projetAModifier.setDateSortieMCO(null);
			}

			projetAModifier.setNomProjet(projetDTO.getNomProjet());
			projetAModifier.setJira(projetDTO.getJira());
			projetAModifier.setTechno(projetDTO.getTechno());
			projetAModifier.setDateDemande(projetDTO.getDateDemande());
			projetAModifier.setLivraisonSouhaitee(projetDTO.getLivraisonSouhaitee());
			projetAModifier.setLivraisonRevisee(projetDTO.getLivraisonRevisee());
			projetAModifier.setAffectationCDS(projetDTO.getAffectationCDS());
			projetAModifier.setPriseEnCompteCDS(projetDTO.getPriseEnCompteCDS());
			projetAModifier.setDateEstimation(projetDTO.getDateEstimation());
			projetAModifier.setDevisEstimation(projetDTO.getDevisEstimation());
			projetAModifier.setDontGarantie(projetDTO.getDontGarantie());
			projetAModifier.setDateFeuVert(projetDTO.getDateFeuVert());
			projetAModifier.setDateLivraison(projetDTO.getDateLivraison());
			projetAModifier.setMCO(projetDTO.isMCO());
			projetAModifier.setCommentaires(projetDTO.getCommentaires());
			projetAModifier.setClient(client);
			projetAModifier.setEtat(etat);
			projetAModifier.setTypeProjet(typeProjet);

			List<List<String>> compositionsString = projetDTO.getListCompositions();
			List<Composition> compositions = new ArrayList<>();

			for (List<String> compositionString : compositionsString) {
				int idComposition = Integer.parseInt(compositionString.get(0));
				Composition composition = compositionRepository.findById(idComposition).get();
				List<Projet> projets = composition.getListProjets();
				projets.remove(projetAModifierOld);
				projets.add(projetAModifier);
				compositions.add(composition);
			}

			projetAModifier.setListCompositions(compositions);

			projetRepository.save(projetAModifier);

			ProjetDTO projetSauvegardeDTO = mapProjetToDTO(projetAModifier);

			return ResponseEntity.ok(projetSauvegardeDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	public ResponseEntity<ProjetDTO> deleteProjet(int id) {
		Optional<Projet> projetASupprimerOptional = projetRepository.findById(id);

		if (projetASupprimerOptional.isPresent()) {

			Projet projetASupprimer = projetASupprimerOptional.get();

			/* On supprime le lien entre composition et projet */
			List<Composition> compositions = projetASupprimer.getListCompositions();

			for (Composition composition : compositions) {
				List<Projet> projetsComposition = composition.getListProjets();
				projetsComposition.removeAll(projetsComposition);
			}

			compositions.removeAll(compositions);

			/* On supprime le lien entre les tâches et le projet */
			List<Tache> taches = projetASupprimer.getListTaches();

			for (Tache tache : taches) {
				tache.setProjet(null); // garder une trace des tâches des utilisateurs qui ont participé au projet
			}

			taches.removeAll(taches);

			

			projetRepository.deleteById(id);

			ProjetDTO projetASupprimerDTO = this.mapProjetToDTO(projetASupprimer);

			return ResponseEntity.ok(projetASupprimerDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
