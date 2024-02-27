package com.stage.newRAH.dto;

public class EquipeDTO {
	
	private int idEquipe;	
	private String libelle;
	
	public EquipeDTO() {

	}
	
	public EquipeDTO(int idEquipe, String libelle) {

		this.idEquipe = idEquipe;
		this.libelle = libelle;
	}
	
	public int getIdEquipe() {
		return idEquipe;
	}
	
	public void setIdEquipe(int idEquipe) {
		this.idEquipe = idEquipe;
	}
	
	public String getLibelle() {
		return libelle;
	}
	
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	@Override
	public String toString() {
		return "EquipeDTO [idEquipe=" + idEquipe + ", libelle=" + libelle + "]";
	}

	
	
}
