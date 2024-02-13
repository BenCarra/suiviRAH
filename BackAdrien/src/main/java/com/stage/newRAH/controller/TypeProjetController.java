package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TypeProjetDTO;
import com.stage.newRAH.service.TypeProjetService;

@RestController
public class TypeProjetController {
	
	@Autowired
	TypeProjetService typeProjetService;
	
	@GetMapping("/typesProjet")
	public ResponseEntity<List<TypeProjetDTO>> getTypesProjet(){
		return typeProjetService.getTypesProjet();
	}
	
	@GetMapping("/typeProjetById/{id}")
	public ResponseEntity<TypeProjetDTO> getTypeProjetById(@PathVariable int id){
		return typeProjetService.getTypeProjetById(id);
	}
	
	@GetMapping("/typeProjetByLibelle/{libelle}")
	public ResponseEntity<TypeProjetDTO> getTypesProjetByLibelle(@PathVariable String libelle){
		return typeProjetService.getTypesProjetByLibelle(libelle);
	}
	
//	@GetMapping("/typesProjetDefaut/{idTypeProjet}")
//	public ResponseEntity<List<TypeProjetDTO>> getTypesProjetDefaut(@PathVariable int idTypeProjet){
//		return typeProjetService.getTypesProjetDefaut(idTypeProjet);
//	}
	
	@PostMapping("/createTypeProjet")
	public ResponseEntity<TypeProjetDTO> createTypeProjet(@RequestBody TypeProjetDTO typeProjetDTO) {
		return typeProjetService.createTypeProjet(typeProjetDTO);
	}
	
	@PostMapping("/updateTypeProjet/{id}")
	public ResponseEntity<TypeProjetDTO> updateTypeProjet(@RequestBody TypeProjetDTO typeProjetDTO, @PathVariable int id) {
		return typeProjetService.updateTypeProjet(typeProjetDTO, id);
	}
	
	@PostMapping("/deleteTypeProjet/{id}")
	public ResponseEntity<TypeProjetDTO> deleteTypeProjet(@PathVariable int id) {
		return typeProjetService.TypeProjet(id);
	}
	
}
