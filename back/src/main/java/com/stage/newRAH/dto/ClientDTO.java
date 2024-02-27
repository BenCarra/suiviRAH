package com.stage.newRAH.dto;

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

	@Override
	public String toString() {
		return "ClientDTO [idClient=" + idClient + ", nomClient=" + nomClient + ", adresseClient=" + adresseClient
				+ ", codePostalClient=" + codePostalClient + ", villeClient=" + villeClient + "]";
	}
	
	
}
