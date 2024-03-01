package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.EquipeDTO;
import com.stage.newRAH.service.EquipeService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EquipeController {

	@Autowired
	EquipeService equipeService;
	
	@GetMapping("/equipes")
	public ResponseEntity<List<EquipeDTO>> getEquipes(){
		return equipeService.getEquipes();
	}
	
	@GetMapping("/equipeById/{id}")
	public ResponseEntity<EquipeDTO> getEquipeById(@PathVariable int id){
		return equipeService.getEquipeById(id);
	}
	
	@GetMapping("/equipesByLibelle/{libelle}")
	public ResponseEntity<List<EquipeDTO>> getEquipesByLibelle(@PathVariable String libelle){
		return equipeService.getEquipesByLibelle(libelle);
	}
	
	@PutMapping("/createEquipe")
	public ResponseEntity<EquipeDTO> createEquipe(@RequestBody EquipeDTO equipeDTO) {
		return equipeService.createEquipe(equipeDTO);
	}
	
	@PostMapping("/updateEquipe/{id}")
	public ResponseEntity<EquipeDTO> updateEquipe(@RequestBody EquipeDTO equipeDTO, @PathVariable int id) {
		return equipeService.updateEquipe(equipeDTO, id);
	}
	
	@DeleteMapping("/deleteEquipe/{id}")
	public ResponseEntity<EquipeDTO> deleteEquipe(@PathVariable int id) {
		return equipeService.deleteEquipe(id);
	}
	
}
