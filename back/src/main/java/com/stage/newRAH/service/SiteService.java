package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.SiteDTO;
import com.stage.newRAH.model.Site;
import com.stage.newRAH.repository.SiteRepository;

@Service
public class SiteService {
	
	@Autowired
	SiteRepository siteRepository;
	
	@Autowired
	UtilisateurService utilisateurService;
	
	public SiteDTO mapSiteToDTO(Site site) {
		
        SiteDTO siteDTO = new SiteDTO();
        
        siteDTO.setIdSite(site.getIdSite());
        siteDTO.setNomSite(site.getNomSite());
        siteDTO.setAdresseSite(site.getAdresseSite());
        siteDTO.setCodePostalSite(site.getCodePostalSite());
        siteDTO.setVilleSite(site.getVilleSite());
        
        return siteDTO;
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
	
	public ResponseEntity<List<SiteDTO>> getSites() {
		Iterable<Site> sites = siteRepository.findAll();
		List<SiteDTO> sitesDTO = new ArrayList<>();
		
		for (Site site : sites) {
			SiteDTO siteDTO = mapSiteToDTO(site);
			sitesDTO.add(siteDTO);
		}
		
		return ResponseEntity.ok(sitesDTO);

    }
}
