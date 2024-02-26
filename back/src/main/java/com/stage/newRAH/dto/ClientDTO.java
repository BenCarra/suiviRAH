package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class ClientDTO {
	
	private int idClient;
	private String nomClient;
	private String adresseClient;
	private String codePostalClient;
	private String villeClient;
	
	public ClientDTO() {

	}

	public ClientDTO(int idClient, String nomClient, String adresseClient, String codePostalClient,
			String villeClient) {

		this.idClient = idClient;
		this.nomClient = nomClient;
		this.adresseClient = adresseClient;
		this.codePostalClient = codePostalClient;
		this.villeClient = villeClient;
	}
}
