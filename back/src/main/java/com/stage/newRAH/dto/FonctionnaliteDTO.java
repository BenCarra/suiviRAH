package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class FonctionnaliteDTO {
	
	private int idFonctionnalite;	
	private String libelle;
	
	public FonctionnaliteDTO() {

	}
	public FonctionnaliteDTO(int idFonctionnalite, String libelle) {
		this.idFonctionnalite = idFonctionnalite;
		this.libelle = libelle;
	}
}
