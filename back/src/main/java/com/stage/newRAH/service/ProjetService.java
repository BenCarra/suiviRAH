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
		projetDTO.setIdClient(projet.getClient().getIdClient());
		projetDTO.setIdEtat(projet.getEtat().getIdEtat());
		projetDTO.setIdTypeProjet(projet.getTypeProjet().getIdTypeProjet());
		projetDTO.setIdTypeDefaut(projet.getTypeDefaut().getIdTypeDefaut());
		
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
	
	// Je n'ai pas utilisé ResponseEntity comme retour afin de pouvoir réutiliser
	// facilement cette méthode dans getProjetsByEquipe
	public List<ProjetDTO> getProjetsByComposition(int id) {
		Optional<Composition> compositionChoisie = compositionRepository.findById(id);
		
		if (compositionChoisie.isPresent()) {
			List<Projet> projets = compositionChoisie.get().getListProjets();
			List<ProjetDTO> projetsDTO = new ArrayList<>();
			
			for(Projet projet : projets) {
				ProjetDTO projetDTO = mapProjetToDTO(projet);
				projetsDTO.add(projetDTO);
			}
			
			return(projetsDTO);
		} else {
			return null;
		}
	}
	
	public ResponseEntity<List<ProjetDTO>> getProjetsByEquipe(int id) {
		List<ProjetDTO> projetsDTO = new ArrayList<>();
		Equipe equipeChoisie = equipeRepository.findById(id);
		
		List<Composition> compositions = equipeChoisie.getListCompositions();
		
		for (Composition composition : compositions) {
			List<ProjetDTO> projetsDTOByCompo = getProjetsByComposition(composition.getIdComposition());
		
			for (ProjetDTO projetDTO : projetsDTOByCompo ) {

				// Pour pouvoir utiliser la méthode contains, il faut redéfinir la méthode equals (si deux projets ont le même id, ils sont identiques)
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
		
		List<Composition> compositions = utilisateurChoisi.get().getListCompositions();
		
		for (Composition composition : compositions) {
			List<ProjetDTO> projetsDTOByCompo = getProjetsByComposition(composition.getIdComposition());
		
			for (ProjetDTO projetDTO : projetsDTOByCompo ) {

				// Pour pouvoir utiliser la méthode contains, il faut redéfinir la méthode equals (si deux projets ont le même id, ils sont identiques)
				if (!projetsDTO.contains(projetDTO)) {
				projetsDTO.add(projetDTO);
				}	
			}			
		}
		return ResponseEntity.ok(projetsDTO);		
	}

	public ResponseEntity<ProjetDTO> createProjet(ProjetDTO projetDTO) {
		Projet nouveauProjet = new Projet();

		// Récupération de certains objets par leurs identifiants 
		Client client = clientRepository.findById(projetDTO.getIdClient()).orElse(null);
		Etat etat = etatRepository.findById(projetDTO.getIdEtat()).orElse(null);
		TypeDefaut typeDefaut = typeDefautRepository.findById(projetDTO.getIdTypeDefaut()).orElse(null);
		TypeProjet typeProjet = typeProjetRepository.findById(projetDTO.getIdTypeProjet()).orElse(null);

		nouveauProjet.setNomProjet(projetDTO.getNomProjet());
		nouveauProjet.setJira(projetDTO.getJira());
		nouveauProjet.setTechno(projetDTO.getTechno());
		nouveauProjet.setService(projetDTO.getService());
		nouveauProjet.setDateDemande(projetDTO.getDateDemande());
		nouveauProjet.setLivraisonSouhaitee(projetDTO.getLivraisonSouhaitee());
		nouveauProjet.setLivraisonRevisee(projetDTO.getLivraisonRevisee());
		nouveauProjet.setAffectationCDS(projetDTO.getAffectationCDS());
		nouveauProjet.setPriseEnCompteCDS(projetDTO.getPriseEnCompteCDS());
		nouveauProjet.setDateEstimation(projetDTO.getDateEstimation());
		nouveauProjet.setDevisEstimation(projetDTO.getDevisEstimation());
		nouveauProjet.setDontGarantie(projetDTO.getDontGarantie());
		nouveauProjet.setDateFeuVert(projetDTO.getDateFeuVert());
		nouveauProjet.setDateLivraison(projetDTO.getDateLivraison());
		nouveauProjet.setMCO(projetDTO.isMCO());
		nouveauProjet.setDatePassageMCO(projetDTO.getDatePassageMCO());
		nouveauProjet.setDateSortieMCO(projetDTO.getDateSortieMCO());
		nouveauProjet.setCommentaires(projetDTO.getCommentaires());
		nouveauProjet.setClient(client);
		nouveauProjet.setEtat(etat);
		nouveauProjet.setTypeDefaut(typeDefaut);
		nouveauProjet.setTypeProjet(typeProjet);
		
		// Enregistrement du nouveau projet dans la base de données
		Projet projetSauvergarde = projetRepository.save(nouveauProjet);

		ProjetDTO projetSauvegardeDTO = mapProjetToDTO(projetSauvergarde);

		return ResponseEntity.ok(projetSauvegardeDTO);
	}
}
	
		


