package com.stage.newRAH.dto;

import java.util.List;

import lombok.Data;

@Data
public class ClientDTO {
	
	private int idClient;
	private String nomClient;
	private String adresseClient;
	private String codePostalClient;
	private String villeClient;
	private boolean actif;
	private boolean modeFonctionnementMCO;
	private List<List<String>> listProjets;
	
	public ClientDTO() {

	}

	public ClientDTO(int idClient, String nomClient, String adresseClient, String codePostalClient, String villeClient,
			boolean actif, boolean modeFonctionnementMCO, List<List<String>> listProjets) {
		this.idClient = idClient;
		this.nomClient = nomClient;
		this.adresseClient = adresseClient;
		this.codePostalClient = codePostalClient;
		this.villeClient = villeClient;
		this.actif = actif;
		this.modeFonctionnementMCO = modeFonctionnementMCO;
		this.listProjets = listProjets;
	}

}
