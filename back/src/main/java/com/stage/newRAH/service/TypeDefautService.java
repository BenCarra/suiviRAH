package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.TypeDefautDTO;
import com.stage.newRAH.model.TypeDefaut;
import com.stage.newRAH.repository.TypeDefautRepository;
import com.stage.newRAH.repository.TypeProjetRepository;

@Service
public class TypeDefautService {
	
	@Autowired
	TypeDefautRepository typeDefautRepository;
	
	@Autowired
	TypeProjetRepository typeProjetRepository;
	

	public TypeDefautDTO mapTypeDefautToDTO(TypeDefaut typedefaut) {
		TypeDefautDTO typeDefautDTO = new TypeDefautDTO();
		
		typeDefautDTO.setIdTypeDefaut(typedefaut.getIdTypeDefaut());
		typeDefautDTO.setLibelle(typedefaut.getLibelle());
		
		return typeDefautDTO;
		
	}
	
	public ResponseEntity<List<TypeDefautDTO>> getTypeDefauts() {
		List<TypeDefautDTO> typeDefautsDTO = new ArrayList<>();
		Iterable<TypeDefaut> typeDefauts = typeDefautRepository.findAll();
		
		for (TypeDefaut typeDefaut : typeDefauts) {
			TypeDefautDTO typeDefautDTO = mapTypeDefautToDTO(typeDefaut);
			typeDefautsDTO.add(typeDefautDTO);
		}
		
		return ResponseEntity.ok(typeDefautsDTO);		
	}
	
//	public ResponseEntity<List<TypeDefautDTO>> getTypeDefauts() {
//		List<TypeDefautDTO> typeDefautsDTO = new ArrayList<>();
//		Iterable<TypeProjet> typeProjets = typeProjetRepository.findAll();
//		
//		for (TypeProjet typeProjet : typeProjets) {
//			List<Correspondance> correspondances = correspondanceRepository.findByTypeProjet(typeProjet);
//			
//			for (Correspondance correspondance : correspondances) {
//				if (correspondance.isEstDeTypeDefaut() == true) {
//					TypeDefaut typeDefaut = correspondance.getTypeDefaut();
//					if (typeDefaut!= null) {
//						TypeDefautDTO typeDefautDTO = mapTypeDefautToDTO(typeDefaut);
//						typeDefautsDTO.add(typeDefautDTO);						
//					}
//				}
//			}
//			
//		}		
//		return ResponseEntity.ok(typeDefautsDTO);		
//	}
}
