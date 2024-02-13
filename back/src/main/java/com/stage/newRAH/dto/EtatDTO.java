package com.stage.newRAH.dto;

public class EtatDTO {
	
	private int idEtat;	
	private String libelle;
	
	public EtatDTO() {
		
	}
	
	public EtatDTO(int idEtat, String libelle) {

		this.idEtat = idEtat;
		this.libelle = libelle;
	}

	public int getIdEtat() {
		return idEtat;
	}

	public void setIdEtat(int idEtat) {
		this.idEtat = idEtat;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
}
