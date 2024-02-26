package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class UtilisateurDTO {
	
	private int idUtilisateur;
	private String nomUtilisateur;
	private String prenomUtilisateur;
	private String login ;
	private String mail;
	private boolean actif;
	private int idTypeUtilisateur;
	
	public UtilisateurDTO() {

	}

	public UtilisateurDTO(int idUtilisateur, String nomUtilisateur, String prenomUtilisateur, String login, String mail,
			boolean actif, int idTypeUtilisateur) {
		this.idUtilisateur = idUtilisateur;
		this.nomUtilisateur = nomUtilisateur;
		this.prenomUtilisateur = prenomUtilisateur;
		this.login = login;
		this.mail = mail;
		this.actif = actif;
		this.idTypeUtilisateur = idTypeUtilisateur;
	}
}
