package com.stage.newRAH.dto;

import java.util.List;

import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Site;
import com.stage.newRAH.model.Tache;
import com.stage.newRAH.model.TypeUtilisateur;

public class UtilisateurDTO {
	
	private int idUtilisateur;
	private String nomUtilisateur;
	private String prenomUtilisateur;
	private String login ;
	private String mail;
	private boolean actif;
	private Site site;
	private TypeUtilisateur typeUtilisateur;
	private List<Tache> listTaches;
	private List<Equipe> listEquipes;
	private List<Composition> listCompositions;
	
	public UtilisateurDTO() {

	}

	public UtilisateurDTO(int idUtilisateur, String nomUtilisateur, String prenomUtilisateur, String login, String mail,
			boolean actif, Site site, TypeUtilisateur typeUtilisateur, List<Tache> listTaches, List<Equipe> listEquipes,
			List<Composition> listCompositions) {
		this.idUtilisateur = idUtilisateur;
		this.nomUtilisateur = nomUtilisateur;
		this.prenomUtilisateur = prenomUtilisateur;
		this.login = login;
		this.mail = mail;
		this.actif = actif;
		this.site = site;
		this.typeUtilisateur = typeUtilisateur;
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

	public Site getSite() {
		return site;
	}

	public void setSite(Site site) {
		this.site = site;
	}

	public TypeUtilisateur getTypeUtilisateur() {
		return typeUtilisateur;
	}

	public void setTypeUtilisateur(TypeUtilisateur typeUtilisateur) {
		this.typeUtilisateur = typeUtilisateur;
	}

	public List<Tache> getListTaches() {
		return listTaches;
	}

	public void setListTaches(List<Tache> listTaches) {
		this.listTaches = listTaches;
	}

	public List<Equipe> getListEquipes() {
		return listEquipes;
	}

	public void setListEquipes(List<Equipe> listEquipes) {
		this.listEquipes = listEquipes;
	}

	public List<Composition> getListCompositions() {
		return listCompositions;
	}

	public void setListCompositions(List<Composition> listCompositions) {
		this.listCompositions = listCompositions;
	}

	@Override
	public String toString() {
		return "UtilisateurDTO [idUtilisateur=" + idUtilisateur + ", nomUtilisateur=" + nomUtilisateur
				+ ", prenomUtilisateur=" + prenomUtilisateur + ", login=" + login + ", mail=" + mail + ", actif="
				+ actif + ", site=" + site + ", typeUtilisateur=" + typeUtilisateur + ", listTaches=" + listTaches
				+ ", listEquipes=" + listEquipes + ", listCompositions=" + listCompositions + "]";
	}

	



}