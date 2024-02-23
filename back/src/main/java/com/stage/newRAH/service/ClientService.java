package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.ClientDTO;
import com.stage.newRAH.model.Client;
import com.stage.newRAH.repository.ClientRepository;

@Service
public class ClientService {
	
	@Autowired
	ClientRepository clientRepository;
	
	public ClientDTO mapClientToDTO(Client client) {
		ClientDTO clientDTO = new ClientDTO();
		
		clientDTO.setIdClient(client.getIdClient());
		clientDTO.setNomClient(client.getNomClient());
		clientDTO.setAdresseClient(client.getAdresseClient());
		clientDTO.setCodePostalClient(client.getCodePostalClient());
		clientDTO.setVilleClient(client.getVilleClient());
		
		return clientDTO;
	}

	public ResponseEntity<List<ClientDTO>> getClients() {
		Iterable<Client> clients = clientRepository.findAll();
		List<ClientDTO> clientsDTO = new ArrayList<>();

		for (Client client: clients) {
			ClientDTO clientDTO = mapClientToDTO(client);
			clientsDTO.add(clientDTO);
		}

		return ResponseEntity.ok(clientsDTO);
		
	}

}
