package com.stage.newRAH.dto;

import java.util.List;

import lombok.Data;

@Data
public class EquipeDTO {
	
	private int idEquipe;	
	private String libelle;
	private List<List<String>> listUtilisateurs;
	private List<List<String>> listCompositions;
	
	public EquipeDTO() {

	}

	public EquipeDTO(int idEquipe, String libelle) {
		this.idEquipe = idEquipe;
		this.libelle = libelle;
	}
	
}
