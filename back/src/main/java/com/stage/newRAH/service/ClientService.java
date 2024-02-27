package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
		
		if (clients.iterator().hasNext()) {
			List<ClientDTO> clientsDTO = new ArrayList<>();
			
			for (Client client : clients) {
				ClientDTO clientDTO = this.mapClientToDTO(client);
				clientsDTO.add(clientDTO);
			}
			return ResponseEntity.ok(clientsDTO);
		} else {
			return ResponseEntity.noContent().build();
		}
		
	}

	public ResponseEntity<ClientDTO> getClientById(int id) {
		Optional<Client> clientChoisi =  clientRepository.findById(id);
		
		if (clientChoisi.isPresent()) {	
			ClientDTO clientDTO = this.mapClientToDTO(clientChoisi.get());
			return ResponseEntity.ok(clientDTO);
		} else {
			return ResponseEntity.notFound().build();		
		}
	}

	public ResponseEntity<ClientDTO> getClientByNom(String nom) {
		Optional<Client> clientChoisi =  clientRepository.findByNom(nom);
		
		if (clientChoisi.isPresent()) {	
			ClientDTO clientDTO = this.mapClientToDTO(clientChoisi.get());
			return ResponseEntity.ok(clientDTO);
		} else {
			return ResponseEntity.notFound().build();		
		}
	}

	public ResponseEntity<ClientDTO> createClient(ClientDTO clientDTO) {
		
		Client nouveauClient = new Client();

		nouveauClient.setAdresseClient(clientDTO.getAdresseClient());
		nouveauClient.setCodePostalClient(clientDTO.getCodePostalClient());
		nouveauClient.setNomClient(clientDTO.getNomClient());
		nouveauClient.setVilleClient(clientDTO.getVilleClient());
		
		clientRepository.save(nouveauClient);
		
		ClientDTO nouveauClientDTO = this.mapClientToDTO(nouveauClient);

		return ResponseEntity.ok(nouveauClientDTO);
	}

	public ResponseEntity<ClientDTO> updateClient(ClientDTO clientDTO, int id) {
		Client clientAModifier = clientRepository.findById(id).get();

		clientAModifier.setAdresseClient(clientDTO.getAdresseClient());
		clientAModifier.setCodePostalClient(clientDTO.getCodePostalClient());
		clientAModifier.setNomClient(clientDTO.getNomClient());
		clientAModifier.setVilleClient(clientDTO.getVilleClient());
		
		clientRepository.save(clientAModifier);
		
		ClientDTO clientAModifierDTO = this.mapClientToDTO(clientAModifier);

		return ResponseEntity.ok(clientAModifierDTO);
	}

	public ResponseEntity<ClientDTO> deleteClient(int id) {
		Client clientASupprimer = clientRepository.findById(id).get();
		
		ClientDTO clientASupprimerDTO = this.mapClientToDTO(clientASupprimer);
		
		clientRepository.deleteById(id);

		return ResponseEntity.ok(clientASupprimerDTO);
	}

}
