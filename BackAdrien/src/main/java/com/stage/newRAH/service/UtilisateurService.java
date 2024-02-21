package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.UtilisateurDTO;
import com.stage.newRAH.model.Site;
import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.SiteRepository;
import com.stage.newRAH.repository.UtilisateurRepository;

@Service
public class UtilisateurService {
	
	@Autowired
	UtilisateurRepository utilisateurRepository;

	@Autowired
	SiteRepository siteRepository;
	
	public UtilisateurDTO mapUtilisateurToDTO(Utilisateur utilisateur) {
		
		UtilisateurDTO utilisateurDTO = new UtilisateurDTO();
		
		utilisateurDTO.setIdUtilisateur(utilisateur.getIdUtilisateur());
		utilisateurDTO.setNomUtilisateur(utilisateur.getNomUtilisateur());
		utilisateurDTO.setPrenomUtilisateur(utilisateur.getPrenomUtilisateur());
		utilisateurDTO.setLogin(utilisateur.getLogin());
		utilisateurDTO.setMail(utilisateur.getMail());
		utilisateurDTO.setActif(utilisateur.isActif());
		utilisateurDTO.setIdSite(utilisateur.getSite().getIdSite());
		utilisateurDTO.setIdTypeUtilisateur(utilisateur.getTypeUtilisateur().getIdTypeUtilisateur());
		
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

    public ResponseEntity<UtilisateurDTO> deleteUtilisateur(int id) {
        Utilisateur utilisateurASupprimer = utilisateurRepository.findById(id).get();

		UtilisateurDTO utilisateurASupprimerDTO = this.mapUtilisateurToDTO(utilisateurASupprimer);

		System.out.println(utilisateurASupprimerDTO);

		utilisateurRepository.deleteById(id);

		return ResponseEntity.ok(utilisateurASupprimerDTO);
    }

    
}
