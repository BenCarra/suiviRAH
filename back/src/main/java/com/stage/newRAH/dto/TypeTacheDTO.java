package com.stage.newRAH.dto;

//import java.util.List;

import lombok.Data;

@Data
public class TypeTacheDTO {
	
	private int idTypeTache;
	private String libelle;
	//private List<List<String>> listTaches;
	
	public TypeTacheDTO() {

	}

	public TypeTacheDTO(int idTypeTache, String libelle) {

		this.idTypeTache = idTypeTache;
		this.libelle = libelle;
	}

}
