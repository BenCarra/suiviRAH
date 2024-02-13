package com.stage.newRAH.dto;

public class TypeTacheDTO {
	
	private int idTypeTache;
	private String libelle;
	
	public TypeTacheDTO() {

	}

	public TypeTacheDTO(int idTypeTache, String libelle) {

		this.idTypeTache = idTypeTache;
		this.libelle = libelle;
	}

	public int getIdTypeTache() {
		return idTypeTache;
	}

	public void setIdTypeTache(int idTypeTache) {
		this.idTypeTache = idTypeTache;
	}

	public String getCategorie() {
		return libelle;
	}

	public void setCategorie(String libelle) {
		this.libelle = libelle;
	}

}
