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

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	@Override
	public String toString() {
		return "TypeTacheDTO [idTypeTache=" + idTypeTache + ", libelle=" + libelle + "]";
	}
	
	

}
