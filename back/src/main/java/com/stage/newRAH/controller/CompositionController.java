package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.CompositionDTO;
import com.stage.newRAH.service.CompositionService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompositionController {
	
	@Autowired
	private CompositionService compositionService;

	@GetMapping("/compositions")
	public ResponseEntity<List<CompositionDTO>> getCompositions() {
		return compositionService.getCompositions();
	}
	
	
	@GetMapping("/compositionsByEquipe/{id}")
	public ResponseEntity<List<CompositionDTO>> getCompositionsByEquipe (@PathVariable int id){
		return compositionService.getCompositionsByEquipe(id);
	}

}

