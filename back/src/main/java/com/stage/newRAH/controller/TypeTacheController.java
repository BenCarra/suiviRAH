package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TypeTacheDTO;
import com.stage.newRAH.service.TypeTacheService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TypeTacheController {

	@Autowired
	TypeTacheService typeTacheService;

	@GetMapping("/typesTache")
	public ResponseEntity<List<TypeTacheDTO>> getTypesTache(){
		return typeTacheService.getTypesTache();
	}
	
	@GetMapping("/typeTacheById/{id}")
	public ResponseEntity<TypeTacheDTO> getTypeTacheById(@PathVariable int id){
		return typeTacheService.getTypeTacheById(id);
	}
	
	@GetMapping("/typeTacheByLibelle/{libelle}")
	public ResponseEntity<TypeTacheDTO> getTypeTacheByLibelle(@PathVariable String libelle){
		return typeTacheService.getTypeTacheByLibelle(libelle);
	}
	
	@PostMapping("/createTypeTache")
	public ResponseEntity<TypeTacheDTO> createTypeTache(@RequestBody TypeTacheDTO typeTacheDTO){
		return typeTacheService.createTypeTache(typeTacheDTO);
	}
	
	@PutMapping("/updateTypeTache/{id}")
	public ResponseEntity<TypeTacheDTO> updateTypeTache(@RequestBody TypeTacheDTO typeTacheDTO, @PathVariable int id){
		return typeTacheService.updateTypeTache(typeTacheDTO, id);
	}

}
