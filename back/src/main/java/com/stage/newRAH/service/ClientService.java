package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.ClientDTO;
import com.stage.newRAH.model.Client;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.repository.ClientRepository;
import com.stage.newRAH.repository.ProjetRepository;
import com.stage.newRAH.repository.TacheRepository;

@Service
public class ClientService {

	@Autowired
	ClientRepository clientRepository;

	@Autowired
	ProjetRepository projetRepository;

	@Autowired
	TacheRepository tacheRepository;

	public ClientDTO mapClientToDTO(Client client) {
		ClientDTO clientDTO = new ClientDTO();

		List<List<String>> listProjets = new ArrayList<>();

		clientDTO.setIdClient(client.getIdClient());
		clientDTO.setNomClient(client.getNomClient());
		clientDTO.setAdresseClient(client.getAdresseClient());
		clientDTO.setCodePostalClient(client.getCodePostalClient());
		clientDTO.setVilleClient(client.getVilleClient());
		clientDTO.setActif(client.isActif());

		if (client.getListProjets() != null) {
			for (Projet projet : client.getListProjets()) {
				List<String> projetObject = new ArrayList<>();
				projetObject.add(String.valueOf(projet.getIdProjet()));
				projetObject.add(projet.getNomProjet());
				listProjets.add(projetObject);
			}
			clientDTO.setListProjets(listProjets);
			;
		}

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
		Optional<Client> clientChoisi = clientRepository.findById(id);

		if (clientChoisi.isPresent()) {
			ClientDTO clientDTO = this.mapClientToDTO(clientChoisi.get());
			return ResponseEntity.ok(clientDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	public ResponseEntity<List<ClientDTO>> getClientsByNom(String nom) {
		Iterable<Client> clientsChoisis = clientRepository.findByNom(nom);

		if (clientsChoisis.iterator().hasNext()) {
			List<ClientDTO> clientsChoisisDTO = new ArrayList<>();

			for (Client clientChoisi : clientsChoisis) {
				ClientDTO clientChoisiDTO = this.mapClientToDTO(clientChoisi);
				clientsChoisisDTO.add(clientChoisiDTO);
			}

			return ResponseEntity.ok(clientsChoisisDTO);
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
		nouveauClient.setActif(clientDTO.isActif());

		clientRepository.save(nouveauClient);

		ClientDTO nouveauClientDTO = this.mapClientToDTO(nouveauClient);

		return ResponseEntity.ok(nouveauClientDTO);
	}

	public ResponseEntity<ClientDTO> updateClient(ClientDTO clientDTO, int id) {
		Optional<Client> clientAModifierOptional = clientRepository.findById(id);

		if (clientAModifierOptional.isPresent()) {

			Client clientAModifier = clientAModifierOptional.get();

			clientAModifier.setAdresseClient(clientDTO.getAdresseClient());
			clientAModifier.setCodePostalClient(clientDTO.getCodePostalClient());
			clientAModifier.setNomClient(clientDTO.getNomClient());
			clientAModifier.setVilleClient(clientDTO.getVilleClient());
			clientAModifier.setActif(clientDTO.isActif());

			clientRepository.save(clientAModifier);

			ClientDTO clientAModifierDTO = this.mapClientToDTO(clientAModifier);

			return ResponseEntity.ok(clientAModifierDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

		
	}

}
