package com.stage.newRAH.dto;

public class CompositionDTO {
	
	private int idComposition;
	private int idEquipe;
	private int idUtilisateur;
	
	public CompositionDTO() {
		
	}

	public CompositionDTO(int idComposition, int idEquipe, int idUtilisateur) {

		this.idComposition = idComposition;
		this.idEquipe = idEquipe;
		this.idUtilisateur = idUtilisateur;
	}

	public int getIdComposition() {
		return idComposition;
	}

	public void setIdComposition(int idComposition) {
		this.idComposition = idComposition;
	}

	public int getIdEquipe() {
		return idEquipe;
	}

	public void setIdEquipe(int idEquipe) {
		this.idEquipe = idEquipe;
	}

	public int getIdUtilisateur() {
		return idUtilisateur;
	}

	public void setIdUtilisateur(int idUtilisateur) {
		this.idUtilisateur = idUtilisateur;
	}

}
