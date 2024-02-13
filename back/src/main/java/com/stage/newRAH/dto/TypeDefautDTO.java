package com.stage.newRAH.dto;

public class TypeDefautDTO {
	
	private int idTypeDefaut;
	private String libelle;

	public TypeDefautDTO() {
		
	}

	public TypeDefautDTO(int idTypeDefaut, String libelle) {

		this.idTypeDefaut = idTypeDefaut;
		this.libelle = libelle;
	}

	public int getIdTypeDefaut() {
		return idTypeDefaut;
	}

	public void setIdTypeDefaut(int idTypeDefaut) {
		this.idTypeDefaut = idTypeDefaut;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
}
