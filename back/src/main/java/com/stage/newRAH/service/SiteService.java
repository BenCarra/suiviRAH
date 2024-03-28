package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.SiteDTO;
import com.stage.newRAH.model.Site;
//import com.stage.newRAH.model.Utilisateur;
import com.stage.newRAH.repository.SiteRepository;

@Service
public class SiteService {

	@Autowired
	SiteRepository siteRepository;

	@Autowired
	UtilisateurService utilisateurService;

	public SiteDTO mapSiteToDTO(Site site) {

		SiteDTO siteDTO = new SiteDTO();

		//List<List<String>> utilisateurs = new ArrayList<>();

		siteDTO.setIdSite(site.getIdSite());
		siteDTO.setNomSite(site.getNomSite());
		siteDTO.setAdresseSite(site.getAdresseSite());
		siteDTO.setCodePostalSite(site.getCodePostalSite());
		siteDTO.setVilleSite(site.getVilleSite());

		/*if (site.getListUtilisateurs() != null) {

			for (Utilisateur utilisateur : site.getListUtilisateurs()) {
				List<String> utilisateurObject = new ArrayList<>();
				utilisateurObject.add(String.valueOf(utilisateur.getIdUtilisateur()));
				utilisateurObject.add(utilisateur.getPrenomUtilisateur());
				utilisateurObject.add(utilisateur.getNomUtilisateur());
				utilisateurs.add(utilisateurObject);
			}

			siteDTO.setListUtilisateurs(utilisateurs);
		}*/

		return siteDTO;
	}

	public ResponseEntity<List<SiteDTO>> getSites() {
		Iterable<Site> sites = siteRepository.findAll();

		if (sites.iterator().hasNext()) {
			List<SiteDTO> sitesDTO = new ArrayList<>();

			for (Site site : sites) {
				SiteDTO siteDTO = mapSiteToDTO(site);
				sitesDTO.add(siteDTO);
			}

			return ResponseEntity.ok(sitesDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	public ResponseEntity<SiteDTO> getSiteById(int id) {
		Optional<Site> siteChoisi = siteRepository.findById(id);

		if (siteChoisi.isPresent()) {
			SiteDTO siteDTO = mapSiteToDTO(siteChoisi.get());
			return ResponseEntity.ok(siteDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<SiteDTO> getSiteByNom(String nom) {
		Optional<Site> siteChoisi = siteRepository.findByNom(nom);

		if (siteChoisi.isPresent()) {
			SiteDTO siteDTO = mapSiteToDTO(siteChoisi.get());
			return ResponseEntity.ok(siteDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<SiteDTO> createSite(SiteDTO siteDTO) {
		Site nouveauSite = new Site();
		
		nouveauSite.setAdresseSite(siteDTO.getAdresseSite());
		nouveauSite.setCodePostalSite(siteDTO.getCodePostalSite());
		nouveauSite.setNomSite(siteDTO.getNomSite());
		nouveauSite.setVilleSite(siteDTO.getVilleSite());

		
		
		siteRepository.save(nouveauSite);
		
		SiteDTO nouveauSiteDTO = this.mapSiteToDTO(nouveauSite);
		
		return ResponseEntity.ok(nouveauSiteDTO);
	}

	public ResponseEntity<SiteDTO> updateSite(SiteDTO siteDTO, int id) {
		Optional<Site> siteAModifierOptional = siteRepository.findById(id);

		if (siteAModifierOptional.isPresent()) {

			Site siteAModifier = siteAModifierOptional.get();

			siteAModifier.setAdresseSite(siteDTO.getAdresseSite());
			siteAModifier.setCodePostalSite(siteDTO.getCodePostalSite());
			siteAModifier.setNomSite(siteDTO.getNomSite());
			siteAModifier.setVilleSite(siteDTO.getVilleSite());
			
			siteRepository.save(siteAModifier);
			
			SiteDTO siteAModifierDTO = this.mapSiteToDTO(siteAModifier);
		
		return ResponseEntity.ok(siteAModifierDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
		
		
	}

}
