package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class EtatDTO {
	
	private int idEtat;
	
	private String libelle;
	
	
	public EtatDTO() {
		
	}

	public EtatDTO(int idEtat, String libelle) {
		this.idEtat = idEtat;
		this.libelle = libelle;
	}

}
