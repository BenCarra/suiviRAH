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

@Service
public class UtilisateurService {
	
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
		
		return utilisateurDTO;
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
	
}
