package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class TypeDefautDTO {

	private int idTypeDefaut;
	private String libelle;
	
	public TypeDefautDTO() {
		
	}

	public TypeDefautDTO(int idTypeDefaut, String libelle) {
		this.idTypeDefaut = idTypeDefaut;
		this.libelle = libelle;
	}
	
}
