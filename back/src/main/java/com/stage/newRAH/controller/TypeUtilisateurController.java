package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TypeUtilisateurDTO;
import com.stage.newRAH.service.TypeUtilisateurService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TypeUtilisateurController {
	
	@Autowired
	TypeUtilisateurService typeUtilisateurService;
	
	@GetMapping("/typesUtilisateur")
	public ResponseEntity<List<TypeUtilisateurDTO>> getTypeUtilisateurs() {
		return typeUtilisateurService.getTypeUtilisateurs();
	}
	
	@PreAuthorize("isTypeUtilisateur(#id)")
	@GetMapping("/typeUtilisateurById/{id}")
	public ResponseEntity<TypeUtilisateurDTO> getTypeUtilisateurById(@PathVariable int id) {
		return typeUtilisateurService.getTypeUtilisateurById(id);
	}
	
	@GetMapping("/typeUtilisateurByLibelle/{libelle}")
	public ResponseEntity<TypeUtilisateurDTO> getTypeUtilisateurByLibelle(@PathVariable String libelle) {
		return typeUtilisateurService.getTypeUtilisateurByLibelle(libelle);
	}
	
	@PostMapping("/createTypeUtilisateur")
	public ResponseEntity<TypeUtilisateurDTO> createTypeUtilisateur(@RequestBody TypeUtilisateurDTO typeUtilisateurDTO) {
		return typeUtilisateurService.createTypeUtilisateur(typeUtilisateurDTO);
	}
	
	@PutMapping("/updateTypeUtilisateur/{id}")
	public ResponseEntity<TypeUtilisateurDTO> updateTypeUtilisateur(@RequestBody TypeUtilisateurDTO typeUtilisateurDTO, @PathVariable int id) {
		return typeUtilisateurService.updateTypeUtilisateur(typeUtilisateurDTO, id);
	}
	
	
}
