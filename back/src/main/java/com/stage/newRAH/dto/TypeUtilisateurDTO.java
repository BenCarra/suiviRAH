package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class TypeUtilisateurDTO {
	
	private int idTypeUtilisateur;
	private String libelle;

	public TypeUtilisateurDTO() {

	}

	public TypeUtilisateurDTO(int idTypeUtilisateur, String libelle) {

		this.idTypeUtilisateur = idTypeUtilisateur;
		this.libelle = libelle;
	}
}
