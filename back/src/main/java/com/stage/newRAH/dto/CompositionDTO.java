package com.stage.newRAH.dto;

import lombok.Data;

@Data
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
}
