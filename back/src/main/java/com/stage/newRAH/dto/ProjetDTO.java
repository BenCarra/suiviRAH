package com.stage.newRAH.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class ProjetDTO {
	
	private int idProjet;
	private String nomProjet;
	private String jira;
	private String techno;
	private String service;
	private Date dateDemande;
	private Date livraisonSouhaitee;
	private Date livraisonRevisee;
	private Date affectationCDS;
	private Date priseEnCompteCDS;
	private Date dateEstimation;
	private double devisEstimation;
	private double dontGarantie;
	private Date dateFeuVert;
	private Date dateLivraison;	
	private boolean MCO;
	private Date datePassageMCO;
	private Date dateSortieMCO;
	private String commentaires;
	private String nomClient;
	private String libelleEtat;
	private String libelleTypeDefaut;
	private String libelleTypeProjet;
	
	public ProjetDTO() {
	}



	public ProjetDTO(int idProjet, String nomProjet, String jira, String techno, String service, Date dateDemande, Date livraisonSouhaitee, Date livraisonRevisee, Date affectationCDS, Date priseEnCompteCDS, Date dateEstimation, double devisEstimation, double dontGarantie, Date dateFeuVert, Date dateLivraison, boolean MCO, Date datePassageMCO, Date dateSortieMCO, String commentaires, String nomClient, String libelleEtat, String libelleTypeDefaut, String libelleTypeProjet) {
		this.idProjet = idProjet;
		this.nomProjet = nomProjet;
		this.jira = jira;
		this.techno = techno;
		this.service = service;
		this.dateDemande = dateDemande;
		this.livraisonSouhaitee = livraisonSouhaitee;
		this.livraisonRevisee = livraisonRevisee;
		this.affectationCDS = affectationCDS;
		this.priseEnCompteCDS = priseEnCompteCDS;
		this.dateEstimation = dateEstimation;
		this.devisEstimation = devisEstimation;
		this.dontGarantie = dontGarantie;
		this.dateFeuVert = dateFeuVert;
		this.dateLivraison = dateLivraison;
		this.MCO = MCO;
		this.datePassageMCO = datePassageMCO;
		this.dateSortieMCO = dateSortieMCO;
		this.commentaires = commentaires;
		this.nomClient = nomClient;
		this.libelleEtat = libelleEtat;
		this.libelleTypeDefaut = libelleTypeDefaut;
		this.libelleTypeProjet = libelleTypeProjet;
	}
		

}