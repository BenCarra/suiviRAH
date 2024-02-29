package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class TypeProjetDTO {

	private int idTypeProjet;
	private String libelle;
	
	public TypeProjetDTO() {
		
	}

	public TypeProjetDTO(int idTypeProjet, String libelle) {
		this.idTypeProjet = idTypeProjet;
		this.libelle = libelle;
	}

}
