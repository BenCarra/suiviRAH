package com.stage.newRAH.dto;

import java.util.List;

public class UtilisateurDTO {
	
	private int idUtilisateur;
	private String nomUtilisateur;
	private String prenomUtilisateur;
	private String login ;
	private String mail;
	private boolean actif;
	private String nomSite;
	private String libelleTypeUtilisateur;
	private List<List<String>> listTaches;
	private List<List<String>> listEquipes;
	private List<List<String>> listCompositions;
	
	public UtilisateurDTO() {

	}

	public UtilisateurDTO(int idUtilisateur, String nomUtilisateur, String prenomUtilisateur, String login, String mail,
			boolean actif, String nomSite, String libelleTypeUtilisateur, List<List<String>> listTaches,
			List<List<String>> listEquipes, List<List<String>> listCompositions) {
		this.idUtilisateur = idUtilisateur;
		this.nomUtilisateur = nomUtilisateur;
		this.prenomUtilisateur = prenomUtilisateur;
		this.login = login;
		this.mail = mail;
		this.actif = actif;
		this.nomSite = nomSite;
		this.libelleTypeUtilisateur = libelleTypeUtilisateur;
		this.listTaches = listTaches;
		this.listEquipes = listEquipes;
		this.listCompositions = listCompositions;
	}

	public int getIdUtilisateur() {
		return idUtilisateur;
	}

	public void setIdUtilisateur(int idUtilisateur) {
		this.idUtilisateur = idUtilisateur;
	}

	public String getNomUtilisateur() {
		return nomUtilisateur;
	}

	public void setNomUtilisateur(String nomUtilisateur) {
		this.nomUtilisateur = nomUtilisateur;
	}

	public String getPrenomUtilisateur() {
		return prenomUtilisateur;
	}

	public void setPrenomUtilisateur(String prenomUtilisateur) {
		this.prenomUtilisateur = prenomUtilisateur;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public boolean isActif() {
		return actif;
	}

	public void setActif(boolean actif) {
		this.actif = actif;
	}

	public String getNomSite() {
		return nomSite;
	}

	public void setNomSite(String nomSite) {
		this.nomSite = nomSite;
	}

	public String getLibelleTypeUtilisateur() {
		return libelleTypeUtilisateur;
	}

	public void setLibelleTypeUtilisateur(String libelleTypeUtilisateur) {
		this.libelleTypeUtilisateur = libelleTypeUtilisateur;
	}

	public List<List<String>> getListTaches() {
		return listTaches;
	}

	public void setListTaches(List<List<String>> listTaches) {
		this.listTaches = listTaches;
	}

	public List<List<String>> getListEquipes() {
		return listEquipes;
	}

	public void setListEquipes(List<List<String>> listEquipes) {
		this.listEquipes = listEquipes;
	}

	public List<List<String>> getListCompositions() {
		return listCompositions;
	}

	public void setListCompositions(List<List<String>> listCompositions) {
		this.listCompositions = listCompositions;
	}

	@Override
	public String toString() {
		return "UtilisateurDTO [idUtilisateur=" + idUtilisateur + ", nomUtilisateur=" + nomUtilisateur
				+ ", prenomUtilisateur=" + prenomUtilisateur + ", login=" + login + ", mail=" + mail + ", actif="
				+ actif + ", nomSite=" + nomSite + ", libelleTypeUtilisateur=" + libelleTypeUtilisateur
				+ ", listTaches=" + listTaches + ", listEquipes=" + listEquipes + ", listCompositions="
				+ listCompositions + "]";
	}

	
}	