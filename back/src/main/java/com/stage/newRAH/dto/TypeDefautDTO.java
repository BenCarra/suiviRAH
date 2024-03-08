package com.stage.newRAH.dto;

import java.util.List;

import lombok.Data;

@Data
public class TypeDefautDTO {

	private int idTypeDefaut;
	private String libelle;
	private List<List<String>> listProjets;
	
	public TypeDefautDTO() {
		
	}

	public TypeDefautDTO(int idTypeDefaut, String libelle, List<List<String>> listProjets) {
		this.idTypeDefaut = idTypeDefaut;
		this.libelle = libelle;
		this.listProjets = listProjets;
	}
	
}
