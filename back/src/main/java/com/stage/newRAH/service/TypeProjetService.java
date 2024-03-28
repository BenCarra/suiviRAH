package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TypeProjetDTO;
//import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.TypeProjet;
import com.stage.newRAH.repository.TypeProjetRepository;

@Service
public class TypeProjetService {

	@Autowired
	TypeProjetRepository typeProjetRepository;

	public TypeProjetDTO mapTypeProjetToDTO(TypeProjet typeProjet) {

		//List<List<String>> projets = new ArrayList<>();

		TypeProjetDTO typeProjetDTO = new TypeProjetDTO();

		typeProjetDTO.setIdTypeProjet(typeProjet.getIdTypeProjet());
		typeProjetDTO.setLibelle(typeProjet.getLibelle());

		/*if (typeProjet.getListProjets() != null) {
			for (Projet projet : typeProjet.getListProjets()) {
				List<String> projetObject = new ArrayList<>();
				projetObject.add(String.valueOf(projet.getIdProjet()));
				projetObject.add(projet.getNomProjet());
				projets.add(projetObject);
			}
			typeProjetDTO.setListProjets(projets);
		}*/

		return typeProjetDTO;

	}

	public ResponseEntity<List<TypeProjetDTO>> getTypesProjet() {
		Iterable<TypeProjet> typesProjet = typeProjetRepository.findAll();

		if (typesProjet.iterator().hasNext()) {
			List<TypeProjetDTO> typesProjetDTO = new ArrayList<>();
			for (TypeProjet typeProjet : typesProjet) {
				TypeProjetDTO typeProjetDTO = this.mapTypeProjetToDTO(typeProjet);
				typesProjetDTO.add(typeProjetDTO);
			}
			return ResponseEntity.ok(typesProjetDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeProjetDTO> getTypeProjetById(int id) {
		Optional<TypeProjet> typeProjetChoisi = typeProjetRepository.findById(id);

		if (typeProjetChoisi.isPresent()) {
			TypeProjetDTO typeProjetChoisiDTO = this.mapTypeProjetToDTO(typeProjetChoisi.get());
			return ResponseEntity.ok(typeProjetChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeProjetDTO> getTypesProjetByLibelle(String libelle) {
		Optional<TypeProjet> typeProjetChoisi = typeProjetRepository.findByLibelle(libelle);

		if (typeProjetChoisi.isPresent()) {
			TypeProjetDTO typeProjetChoisiDTO = this.mapTypeProjetToDTO(typeProjetChoisi.get());
			return ResponseEntity.ok(typeProjetChoisiDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<TypeProjetDTO> createTypeProjet(TypeProjetDTO typeProjetDTO) {
		TypeProjet nouveauTypeProjet = new TypeProjet();
		
		nouveauTypeProjet.setLibelle(typeProjetDTO.getLibelle());
		
		typeProjetRepository.save(nouveauTypeProjet);
		
		TypeProjetDTO nouveauTypeProjetDTO = this.mapTypeProjetToDTO(nouveauTypeProjet);
		
		return ResponseEntity.ok(nouveauTypeProjetDTO);
	}

	public ResponseEntity<TypeProjetDTO> updateTypeProjet(TypeProjetDTO typeProjetDTO, int id) {
		
		Optional<TypeProjet> typeProjetAModifierOptional = typeProjetRepository.findById(id);

		if (typeProjetAModifierOptional.isPresent()) {
			TypeProjet typeProjetAModifier = typeProjetAModifierOptional.get();

			typeProjetAModifier.setLibelle(typeProjetDTO.getLibelle());
		
			typeProjetRepository.save(typeProjetAModifier);
			
			TypeProjetDTO typeProjetAModifiertDTO = this.mapTypeProjetToDTO(typeProjetAModifier);
			
			return ResponseEntity.ok(typeProjetAModifiertDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
		
		
	}

}
