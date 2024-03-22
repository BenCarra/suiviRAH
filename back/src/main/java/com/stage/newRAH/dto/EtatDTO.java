package com.stage.newRAH.dto;

import java.util.List;

import lombok.Data;

@Data
public class EtatDTO {
	
	private int idEtat;
	private String libelle;
	private List<List<String>> listProjets;
	
	
	public EtatDTO() {
		
	}

	public EtatDTO(int idEtat, String libelle) {
		this.idEtat = idEtat;
		this.libelle = libelle;
	}

}
