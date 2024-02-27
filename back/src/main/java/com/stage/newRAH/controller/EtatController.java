package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.EtatDTO;
import com.stage.newRAH.service.EtatService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EtatController {

	@Autowired
	EtatService etatService;
	
	@GetMapping("/etats")
	public ResponseEntity<List<EtatDTO>> getEtats(){
		return etatService.getEtats();
	}
	
	@GetMapping("/etatById/{id}")
	public ResponseEntity<EtatDTO> getEtatById(@PathVariable int id){
		return etatService.getEtatById(id);
	}
	
	@GetMapping("/etatByLibelle/{libelle}")
	public ResponseEntity<EtatDTO> getEtatByLibelle(@PathVariable String libelle){
		return etatService.getEtatByLibelle(libelle);
	}
	
	@PostMapping("/createEtat")
	public ResponseEntity<EtatDTO> createEtat(@RequestBody EtatDTO etatDTO){
		return etatService.createEtat(etatDTO);
	}
	
	@PostMapping("/updateEtat/{id}")
	public ResponseEntity<EtatDTO> updateEtat(@RequestBody EtatDTO etatDTO, @PathVariable int id){
		return etatService.updateEtat(etatDTO, id);
	}
	
	@PostMapping("/deleteEtat/{id}")
	public ResponseEntity<EtatDTO> deleteEtat(@PathVariable int id){
		return etatService.deleteEtat(id);
	}
	
}
