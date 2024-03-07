package com.stage.newRAH.dto;

import java.util.List;

import lombok.Data;

@Data
public class TypeUtilisateurDTO {
	
	private int idTypeUtilisateur;
	private String libelle;
	private List<List<String>> listUtilisateurs;

	public TypeUtilisateurDTO() {

	}

	public TypeUtilisateurDTO(int idTypeUtilisateur, String libelle, List<List<String>> listUtilisateurs) {

		this.idTypeUtilisateur = idTypeUtilisateur;
		this.libelle = libelle;
		this.listUtilisateurs = listUtilisateurs;
	}
	
}
