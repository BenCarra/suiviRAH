package com.stage.newRAH.dto;

import java.util.List;

public class ClientDTO {
	
	private int idClient;
	private String nomClient;
	private String adresseClient;
	private String codePostalClient;
	private String villeClient;
	private List<List<String>> listProjets;
	
	public ClientDTO() {

	}

	public ClientDTO(int idClient, String nomClient, String adresseClient, String codePostalClient, String villeClient,
			List<List<String>> listProjets) {
		this.idClient = idClient;
		this.nomClient = nomClient;
		this.adresseClient = adresseClient;
		this.codePostalClient = codePostalClient;
		this.villeClient = villeClient;
		this.listProjets = listProjets;
	}

	public int getIdClient() {
		return idClient;
	}

	public void setIdClient(int idClient) {
		this.idClient = idClient;
	}

	public String getNomClient() {
		return nomClient;
	}

	public void setNomClient(String nomClient) {
		this.nomClient = nomClient;
	}

	public String getAdresseClient() {
		return adresseClient;
	}

	public void setAdresseClient(String adresseClient) {
		this.adresseClient = adresseClient;
	}

	public String getCodePostalClient() {
		return codePostalClient;
	}

	public void setCodePostalClient(String codePostalClient) {
		this.codePostalClient = codePostalClient;
	}

	public String getVilleClient() {
		return villeClient;
	}

	public void setVilleClient(String villeClient) {
		this.villeClient = villeClient;
	}

	public List<List<String>> getListProjets() {
		return listProjets;
	}

	public void setListProjets(List<List<String>> listProjets) {
		this.listProjets = listProjets;
	}

	@Override
	public String toString() {
		return "ClientDTO [idClient=" + idClient + ", nomClient=" + nomClient + ", adresseClient=" + adresseClient
				+ ", codePostalClient=" + codePostalClient + ", villeClient=" + villeClient + ", listProjets="
				+ listProjets + "]";
	}

	
	
}
