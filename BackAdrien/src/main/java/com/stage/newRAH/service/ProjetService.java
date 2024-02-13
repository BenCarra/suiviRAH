package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.ProjetDTO;
import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.CompositionRepository;
import com.stage.newRAH.repository.EquipeRepository;
import com.stage.newRAH.repository.ProjetRepository;
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
		
		List<ProjetDTO> listProjetsDTO = new ArrayList<>();
		
		for (Projet projet : projets) {
			ProjetDTO projetDTO = this.mapProjetToDTO(projet);
			listProjetsDTO.add(projetDTO);
		}	
		return ResponseEntity.ok(listProjetsDTO);
	}

	public ResponseEntity<ProjetDTO> getProjetById(int id) {
		Optional<Projet> projetChoisi = projetRepository.findById(id);
		
		if (projetChoisi.isPresent()) {
			ProjetDTO projetDTO = this.mapProjetToDTO(projetChoisi.get());
			return ResponseEntity.ok(projetDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<ProjetDTO> getProjetByNom(String nom) {
		Optional<Projet> projetChoisi = projetRepository.findByNom(nom);
		
		if (projetChoisi.isPresent()) {
			ProjetDTO projetDTO = this.mapProjetToDTO(projetChoisi.get());
			return ResponseEntity.ok(projetDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}

	public ResponseEntity<List<ProjetDTO>> getProjetsByClient(int idClient) {
		Iterable<Projet> projetsChoisis = projetRepository.findByClient(idClient);
		
		List<ProjetDTO> projetsDTO = new ArrayList<>();
		
		if (projetsChoisis.iterator().hasNext()) {
			for (Projet projet : projetsChoisis) {
				ProjetDTO projetDTO = this.mapProjetToDTO(projet);
				projetsDTO.add(projetDTO);
			}
			return ResponseEntity.ok(projetsDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	public List<ProjetDTO> getProjetsByComposition(int idComposition) {
		Optional<Composition> compositionChoisie = compositionRepository.findById(idComposition);
		
		if (compositionChoisie.isPresent()) {
			List<Projet> projets = compositionChoisie.get().getListProjets();
			List<ProjetDTO> projetsDTO = new ArrayList<>();
			
			for(Projet projet : projets) {
				ProjetDTO projetDTO = mapProjetToDTO(projet);
				projetsDTO.add(projetDTO);
			}
			
			return projetsDTO;
		} else {
			return null;
		}
	}


	public ResponseEntity<List<ProjetDTO>> getProjetsByEquipe(int idEquipe) {
		List<ProjetDTO> projetsDTO = new ArrayList<>();
		Optional<Equipe> equipeChoisie = equipeRepository.findById(idEquipe);
		
		List<Composition> compositions = equipeChoisie.get().getListCompositions();
		
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

	public ResponseEntity<List<ProjetDTO>> getProjetsByUtilisateur(int idUtilisateur) {
		List<ProjetDTO> projetsDTO = new ArrayList<>();
		Optional<Utilisateur> utilisateurChoisi = utilisateurRepository.findById(idUtilisateur);
		
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
		return null;
	}

	public ResponseEntity<ProjetDTO> updateProjet(ProjetDTO projetDTO, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public ResponseEntity<ProjetDTO> duplicateProjet(ProjetDTO projetDTO, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public ResponseEntity<ProjetDTO> deleteProjet(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	
	


	

}
