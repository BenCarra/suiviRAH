package com.stage.newRAH.dto;

import java.util.List;

import lombok.Data;

@Data
public class TypeProjetDTO {

	private int idTypeProjet;
	private String libelle;
	private List<List<String>> listProjets;
	
	public TypeProjetDTO() {
		
	}

	public TypeProjetDTO(int idTypeProjet, String libelle) {
		this.idTypeProjet = idTypeProjet;
		this.libelle = libelle;
	}

}
