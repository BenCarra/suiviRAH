package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class CompositionDTO {
	
	private int idComposition;
	private String libelleEquipe;
	private String loginUtilisateur;
	
	public CompositionDTO() {
		
	}

	public CompositionDTO(int idComposition, String libelleEquipe, String loginUtilisateur) {

		this.idComposition = idComposition;
		this.libelleEquipe = libelleEquipe;
		this.loginUtilisateur = loginUtilisateur;
	}

}
