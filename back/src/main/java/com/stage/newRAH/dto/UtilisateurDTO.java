package com.stage.newRAH.dto;


import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class UtilisateurDTO {
	
	private int idUtilisateur;
	private String nomUtilisateur;
	private String prenomUtilisateur;
	private Date dateNaissance;
	private String login;
	private String password;
	private String mail;
	private boolean actif;
	private String nomSite;
	private String libelleTypeUtilisateur;
	private List<List<String>> listTaches;
	private List<List<String>> listEquipes;
	private List<List<String>> listCompositions;
	
	public UtilisateurDTO() {

	}

	public UtilisateurDTO(int idUtilisateur, String nomUtilisateur, String prenomUtilisateur, Date dateNaissance,
			String login, String password, String mail, boolean actif, String nomSite, String libelleTypeUtilisateur) {
		this.idUtilisateur = idUtilisateur;
		this.nomUtilisateur = nomUtilisateur;
		this.prenomUtilisateur = prenomUtilisateur;
		this.dateNaissance = dateNaissance;
		this.login = login;
		this.password = password;
		this.mail = mail;
		this.actif = actif;
		this.nomSite = nomSite;
		this.libelleTypeUtilisateur = libelleTypeUtilisateur;
	}
	
}	