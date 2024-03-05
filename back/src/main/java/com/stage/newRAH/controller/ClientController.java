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

import com.stage.newRAH.dto.ClientDTO;
import com.stage.newRAH.service.ClientService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {
	
	@Autowired
	ClientService clientService;

	@GetMapping("/clients")
	public ResponseEntity<List<ClientDTO>> getClients(){
		return clientService.getClients();
	}
	
	@GetMapping("/clientById/{id}")
	public ResponseEntity<ClientDTO> getClientById(@PathVariable int id) {
		return clientService.getClientById(id);
		
	}

	@GetMapping("/clientsByNom/{nom}")
	public ResponseEntity<List<ClientDTO>> getClientsByNom(@PathVariable String nom) {
		return clientService.getClientsByNom(nom);
		
	}
	
	@PostMapping("/createClient")
	public ResponseEntity<ClientDTO> createClient(@RequestBody ClientDTO clientDTO) {
		return clientService.createClient(clientDTO);
	}
	
	@PutMapping("/updateClient/{id}")
	public ResponseEntity<ClientDTO> updateClient(@RequestBody ClientDTO clientDTO, @PathVariable int id) {
		return clientService.updateClient(clientDTO, id);
	}
	
}
