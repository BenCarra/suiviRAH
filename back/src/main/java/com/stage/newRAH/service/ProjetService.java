package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.model.Client;
import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Etat;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.TypeDefaut;
import com.stage.newRAH.model.TypeProjet;
import com.stage.newRAH.model.Utilisateur;
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
		
	public ProjetDTO mapProjetToDTO (Projet projet) {
		
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

	public ResponseEntity<List<ProjetDTO>> getProjets() {
		Iterable<Projet> projets = projetRepository.findAll();
		List<ProjetDTO> projetsDTO = new ArrayList<>();

		for (Projet projet : projets) {
			ProjetDTO projetDTO = mapProjetToDTO(projet);
			projetsDTO.add(projetDTO);
		}

		return ResponseEntity.ok(projetsDTO);
	}
	
}
	
		


