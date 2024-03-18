package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.dto.SuiviProjetDTO;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.SuiviProjet;
import com.stage.newRAH.repository.ClientRepository;
import com.stage.newRAH.repository.CompositionRepository;
import com.stage.newRAH.repository.EquipeRepository;
import com.stage.newRAH.repository.EtatRepository;
import com.stage.newRAH.repository.ProjetRepository;
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

	public ProjetDTO mapProjetToDTO(Projet projet) {

		ProjetDTO projetDTO = new ProjetDTO();

		projetDTO.setIdProjet(projet.getIdProjet());
		projetDTO.setNomProjet(projet.getNomProjet());
		projetDTO.setJira(projet.getJira());
		projetDTO.setTechno(projet.getTechno());
		projetDTO.setService(projet.getService());
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
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(suiviProjet.getDateTache());
		suiviProjetDTO.setAnneeTache(calendar.get(Calendar.YEAR));

		return suiviProjetDTO;

	}

	public ResponseEntity<List<SuiviProjetDTO>> buildSuiviProjets(List<SuiviProjet> suiviPs, List<SuiviProjet> suiviPsDT, List<SuiviProjetDTO> suiviPsDTO){
		
		if (suiviPs.iterator().hasNext() && suiviPsDT.iterator().hasNext()) {

			SuiviProjetDTO suiviPDTO = mapSuiviProjetToDTO(suiviPs.get(0));
			suiviPsDTO.add(suiviPDTO);

			for (int i = 1; i < suiviPs.size(); i++) {
				// Si l'idProjet du suivi Projet courant est différent de l'idProjet du suivi Projet précédent
				if (suiviPs.get(i).getIdProjet() != suiviPs.get(i-1).getIdProjet()) {

					int j = 0;
					boolean trouve = false;
					// Recherche du suivi projet correspondant dans les suivis avec la durée totale du projet précédent
					while (!trouve && j < suiviPsDT.size()) {
						
						if ((suiviPsDT.get(j).getIdProjet() == suiviPs.get(i-1).getIdProjet())) {
							SuiviProjetDTO suiviPDTO1 = mapSuiviProjetToDTO(suiviPsDT.get(j));
							suiviPDTO1.setAnneeTache(0); // On met 0 afin de distinguer les cas avec durée totale de suivi projet et duréeTache sur une année
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
			return ResponseEntity.notFound().build();
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

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjets() {

		List<SuiviProjet> suiviProjets = projetRepository.getSuiviProjets();
		List<SuiviProjet> suiviProjetsDureeTotale = projetRepository.getSuiviProjetsDureeTotale();
		List<SuiviProjetDTO> suiviProjetsDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjets, suiviProjetsDureeTotale, suiviProjetsDTO);

		return response;

	}

	/*
	 * public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByAnnee(int annee)
	 * {
	 * 
	 * Iterable<SuiviProjet> suiviProjets =
	 * projetRepository.getSuiviProjetsByAnnee(annee);
	 * List<SuiviProjetDTO> suiviProjetsDTO = new ArrayList<>();
	 * 
	 * if (suiviProjets.iterator().hasNext()) {
	 * 
	 * for (SuiviProjet suiviProjet: suiviProjets) {
	 * SuiviProjetDTO suiviProjetDTO = mapSuiviProjetToDTO(suiviProjet);
	 * suiviProjetsDTO.add(suiviProjetDTO);
	 * }
	 * 
	 * return ResponseEntity.ok(suiviProjetsDTO);
	 * } else {
	 * return ResponseEntity.notFound().build();
	 * }
	 * 
	 * }
	 */

	public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByClient(String nomClient) {

		List<SuiviProjet> suiviProjetsByClient = projetRepository.getSuiviProjetsByClient(nomClient);
		List<SuiviProjet> suiviProjetsByClientDureeTotale = projetRepository.getSuiviProjetsByClientDureeTotale(nomClient);
		List<SuiviProjetDTO> suiviProjetsByClientDTO = new ArrayList<>();

		ResponseEntity<List<SuiviProjetDTO>> response = this.buildSuiviProjets(suiviProjetsByClient, suiviProjetsByClientDureeTotale, suiviProjetsByClientDTO);

		return response;

	}

	/*public ResponseEntity<List<SuiviProjetDTO>> getSuiviProjetsByClientByAnnee(String nomClient, int annee) {
		
		Iterable<SuiviProjet> suiviProjets = projetRepository.getSuiviProjetsByClientByAnnee(nomClient, annee);
		List<SuiviProjetDTO> suiviProjetsDTO = new ArrayList<>();

		if (suiviProjets.iterator().hasNext()) {

			for (SuiviProjet suiviProjet: suiviProjets) {
				SuiviProjetDTO suiviProjetDTO = mapSuiviProjetToDTO(suiviProjet);
				suiviProjetsDTO.add(suiviProjetDTO);
			}

			return ResponseEntity.ok(suiviProjetsDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}*/
	
}
