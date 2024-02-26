package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class TypeTacheDTO {
	
	private int idTypeTache;
	private String libelle;
	
	public TypeTacheDTO() {

	}

	public TypeTacheDTO(int idTypeTache, String libelle) {

		this.idTypeTache = idTypeTache;
		this.libelle = libelle;
	}

	

}
