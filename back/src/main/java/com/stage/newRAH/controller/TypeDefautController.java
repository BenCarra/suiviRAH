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

import com.stage.newRAH.dto.TypeDefautDTO;
import com.stage.newRAH.service.TypeDefautService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TypeDefautController {
	
	@Autowired
	TypeDefautService typeDefautService;

	@GetMapping("/typesDefaut")
	public ResponseEntity<List<TypeDefautDTO>> getTypesDefaut(){
		return typeDefautService.getTypesDefaut();
	}
	
	@GetMapping("/typeDefautById/{id}")
	public ResponseEntity<TypeDefautDTO> getTypeDefautById(@PathVariable int id) {
		return typeDefautService.getTypeDefautById(id);
		
	}

	@GetMapping("/typeDefautByLibelle/{libelle}")
	public ResponseEntity<TypeDefautDTO> getTypeDefautByLibelle(@PathVariable String libelle) {
		return typeDefautService.getTypeDefautByLibelle(libelle);
		
	}
	
	@PostMapping("/createTypeDefaut")
	public ResponseEntity<TypeDefautDTO> createTypeDefaut(@RequestBody TypeDefautDTO typeDefautDTO) {
		return typeDefautService.createTypeDefaut(typeDefautDTO);
	}
	
	@PutMapping("/updateTypeDefaut/{id}")
	public ResponseEntity<TypeDefautDTO> updateTypeDefaut(@RequestBody TypeDefautDTO typeDefautDTO, @PathVariable int id) {
		return typeDefautService.updateTypeDefaut(typeDefautDTO, id);
	}
	
}
