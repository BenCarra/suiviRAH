package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TypeUtilisateurDTO;
import com.stage.newRAH.service.TypeUtilisateurService;

@RestController
public class TypeUtilisateurController {
	
	@Autowired
	TypeUtilisateurService typeUtilisateurService;
	
	@GetMapping("/typeUtilisateurs")
	public ResponseEntity<List<TypeUtilisateurDTO>> getTypeUtilisateurs() {
		return typeUtilisateurService.getTypeUtilisateurs();
	}
	
}
