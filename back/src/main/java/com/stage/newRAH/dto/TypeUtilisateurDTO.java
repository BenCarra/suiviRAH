package com.stage.newRAH.dto;

public class TypeUtilisateurDTO {
	
	private int idTypeUtilisateur;
	private String libelle;

	public TypeUtilisateurDTO() {

	}

	public TypeUtilisateurDTO(int idTypeUtilisateur, String libelle) {

		this.idTypeUtilisateur = idTypeUtilisateur;
		this.libelle = libelle;
	}


	public int getIdTypeUtilisateur() {
		return idTypeUtilisateur;
	}

	public void setIdTypeUtilisateur(int idTypeUtilisateur) {
		this.idTypeUtilisateur = idTypeUtilisateur;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	@Override
	public String toString() {
		return "TypeUtilisateurDTO [idTypeUtilisateur=" + idTypeUtilisateur + ", libelle=" + libelle + "]";
	}
	
	

}
