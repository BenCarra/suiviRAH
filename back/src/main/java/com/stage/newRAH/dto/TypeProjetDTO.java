package com.stage.newRAH.dto;

public class TypeProjetDTO {

	private int idTypeProjet;
	private String libelle;
	
	public TypeProjetDTO() {
		
	}

	public TypeProjetDTO(int idTypeProjet, String libelle) {
		this.idTypeProjet = idTypeProjet;
		this.libelle = libelle;
	}

	public int getIdTypeProjet() {
		return idTypeProjet;
	}

	public void setIdTypeProjet(int idTypeProjet) {
		this.idTypeProjet = idTypeProjet;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	@Override
	public String toString() {
		return "TypeProjetDTO [idTypeProjet=" + idTypeProjet + ", libelle=" + libelle + "]";
	}

	
	
	
	
}
