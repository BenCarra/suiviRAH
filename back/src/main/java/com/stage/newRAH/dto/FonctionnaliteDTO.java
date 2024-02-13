package com.stage.newRAH.dto;

public class FonctionnaliteDTO {
	
	private int idFonctionnalite;	
	private String libelle;
	
	public FonctionnaliteDTO() {

	}
	public FonctionnaliteDTO(int idFonctionnalite, String libelle) {
		this.idFonctionnalite = idFonctionnalite;
		this.libelle = libelle;
	}
	
	public int getIdFonctionnalite() {
		return idFonctionnalite;
	}
	
	public void setIdFonctionnalite(int idFonctionnalite) {
		this.idFonctionnalite = idFonctionnalite;
	}
	
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	
	

}
