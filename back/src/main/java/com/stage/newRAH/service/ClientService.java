package com.stage.newRAH.service;

import org.springframework.beans.factory.annotation.Autowired;
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

}
