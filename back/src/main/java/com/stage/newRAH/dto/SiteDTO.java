package com.stage.newRAH.dto;


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

	public int getIdSite() {
		return idSite;
	}

	public void setIdSite(int idSite) {
		this.idSite = idSite;
	}

	public String getNomSite() {
		return nomSite;
	}

	public void setNomSite(String nomSite) {
		this.nomSite = nomSite;
	}

	public String getAdresseSite() {
		return adresseSite;
	}

	public void setAdresseSite(String adresseSite) {
		this.adresseSite = adresseSite;
	}

	public String getCodePostalSite() {
		return codePostalSite;
	}

	public void setCodePostalSite(String codePostalSite) {
		this.codePostalSite = codePostalSite;
	}

	public String getVilleSite() {
		return villeSite;
	}

	public void setVilleSite(String villeSite) {
		this.villeSite = villeSite;
	}

	@Override
	public String toString() {
		return "SiteDTO [idSite=" + idSite + ", nomSite=" + nomSite + ", adresseSite=" + adresseSite
				+ ", codePostalSite=" + codePostalSite + ", villeSite=" + villeSite + "]";
	}

	
	
}
