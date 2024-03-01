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

	public EquipeDTO(int idEquipe, String libelle, List<List<String>> listUtilisateurs,
			List<List<String>> listCompositions) {
		this.idEquipe = idEquipe;
		this.libelle = libelle;
		this.listUtilisateurs = listUtilisateurs;
		this.listCompositions = listCompositions;
	}
	
}
