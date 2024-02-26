package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class SiteDTO {
	
	private int idSite;
	private String nomSite;
	private String adresseSite;
	private String codePostalSite;
	private String villeSite;

	public SiteDTO() {
	}

	public SiteDTO(int idSite, String nomSite, String adresseSite, String codePostalSite, String villeSite) {
		this.idSite = idSite;
		this.nomSite = nomSite;
		this.adresseSite = adresseSite;
		this.codePostalSite = codePostalSite;
		this.villeSite = villeSite;
	}

}