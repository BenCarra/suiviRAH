package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class EquipeDTO {
	
	private int idEquipe;	
	private String libelle;
	
	public EquipeDTO() {

	}
	
	public EquipeDTO(int idEquipe, String libelle) {

		this.idEquipe = idEquipe;
		this.libelle = libelle;
	}

}
