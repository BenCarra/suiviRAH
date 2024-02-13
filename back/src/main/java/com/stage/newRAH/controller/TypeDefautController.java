package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TypeDefautDTO;
import com.stage.newRAH.service.TypeDefautService;

@RestController
public class TypeDefautController {
	
	@Autowired
	TypeDefautService typeDefautService;
	
	@GetMapping("/typeDefauts")
	public ResponseEntity<List<TypeDefautDTO>> getTypeDefauts() {
		return typeDefautService.getTypeDefauts();
	}

}
