package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.EtatDTO;
import com.stage.newRAH.model.Etat;
import com.stage.newRAH.repository.EtatRepository;

@Service
public class EtatService {
	
	@Autowired
	EtatRepository etatRepository;
	
	public EtatDTO mapEtatToDTO(Etat etat) {
		
		EtatDTO etatDTO = new EtatDTO();
		
		etatDTO.setIdEtat(etat.getIdEtat());
		etatDTO.setLibelle(etat.getLibelle());
		
		return etatDTO;
		
	}

	public ResponseEntity<List<EtatDTO>> getEtats() {
		Iterable<Etat> etats = etatRepository.findAll();
		
		if (etats.iterator().hasNext()) {
			List<EtatDTO> etatsDTO = new ArrayList<>();
			for (Etat etat : etats) {
				EtatDTO etatDTO = this.mapEtatToDTO(etat);
				etatsDTO.add(etatDTO);
			}
			return ResponseEntity.ok(etatsDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<EtatDTO> getEtatById(int id) {
		Optional<Etat> etatChoisi = etatRepository.findById(id);
		
		if (etatChoisi.isPresent()) {
			EtatDTO etatChoisiDTO = this.mapEtatToDTO(etatChoisi.get());
			return ResponseEntity.ok(etatChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	public ResponseEntity<EtatDTO> getEtatByLibelle(String libelle) {
		Optional<Etat> etatChoisi = etatRepository.findByLibelle(libelle);
		
		if (etatChoisi.isPresent()) {
			EtatDTO etatChoisiDTO = this.mapEtatToDTO(etatChoisi.get());
			return ResponseEntity.ok(etatChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<EtatDTO> createEtat(EtatDTO etatDTO) {
		Etat nouvelEtat = new Etat();
		
		nouvelEtat.setLibelle(etatDTO.getLibelle());
		
		etatRepository.save(nouvelEtat);
		
		EtatDTO nouvelEtatDTO = this.mapEtatToDTO(nouvelEtat);
		
		return ResponseEntity.ok(nouvelEtatDTO);
	}

	public ResponseEntity<EtatDTO> updateEtat(EtatDTO etatDTO, int id) {
		Etat etatAModifier = etatRepository.findById(id).get();
		
		etatAModifier.setLibelle(etatDTO.getLibelle());
		
		etatRepository.save(etatAModifier);
		
		EtatDTO etatAModifierDTO = this.mapEtatToDTO(etatAModifier);
		
		return ResponseEntity.ok(etatAModifierDTO);
	}

	public ResponseEntity<EtatDTO> deleteEtat(int id) {
		Etat etatASupprimer = etatRepository.findById(id).get();		
		
		EtatDTO etatASupprimerDTO = this.mapEtatToDTO(etatASupprimer);
		
		etatRepository.deleteById(id);
		
		return ResponseEntity.ok(etatASupprimerDTO);
	}

}
