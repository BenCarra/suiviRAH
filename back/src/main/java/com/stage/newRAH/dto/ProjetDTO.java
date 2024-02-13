package com.stage.newRAH.dto;

import java.sql.Date;
import java.util.Objects;

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
	private int idClient;
	private int idEtat;
	private int idTypeDefaut;
	private int idTypeProjet;
	
	public ProjetDTO() {
	}

	
	public ProjetDTO(int idProjet, String nomProjet, String jira, String techno, String service, Date dateDemande,
			Date livraisonSouhaitee, Date livraisonRevisee, Date affectationCDS, Date priseEnCompteCDS,
			Date dateEstimation, double devisEstimation, double dontGarantie, Date dateFeuVert, Date dateLivraison,
			boolean mCO, Date datePassageMCO, Date dateSortieMCO, String commentaires, int idClient, int idEtat,
			int idTypeDefaut, int idTypeProjet) {

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
		MCO = mCO;
		this.datePassageMCO = datePassageMCO;
		this.dateSortieMCO = dateSortieMCO;
		this.commentaires = commentaires;
		this.idClient = idClient;
		this.idEtat = idEtat;
		this.idTypeDefaut = idTypeDefaut;
		this.idTypeProjet = idTypeProjet;
	}


	public int getIdProjet() {
		return idProjet;
	}


	public void setIdProjet(int idProjet) {
		this.idProjet = idProjet;
	}


	public String getNomProjet() {
		return nomProjet;
	}


	public void setNomProjet(String nomProjet) {
		this.nomProjet = nomProjet;
	}


	public String getJira() {
		return jira;
	}


	public void setJira(String jira) {
		this.jira = jira;
	}


	public String getTechno() {
		return techno;
	}


	public void setTechno(String techno) {
		this.techno = techno;
	}


	public String getService() {
		return service;
	}


	public void setService(String service) {
		this.service = service;
	}


	public Date getDateDemande() {
		return dateDemande;
	}


	public void setDateDemande(Date dateDemande) {
		this.dateDemande = dateDemande;
	}


	public Date getLivraisonSouhaitee() {
		return livraisonSouhaitee;
	}


	public void setLivraisonSouhaitee(Date livraisonSouhaitee) {
		this.livraisonSouhaitee = livraisonSouhaitee;
	}


	public Date getLivraisonRevisee() {
		return livraisonRevisee;
	}


	public void setLivraisonRevisee(Date livraisonRevisee) {
		this.livraisonRevisee = livraisonRevisee;
	}


	public Date getAffectationCDS() {
		return affectationCDS;
	}


	public void setAffectationCDS(Date affectationCDS) {
		this.affectationCDS = affectationCDS;
	}


	public Date getPriseEnCompteCDS() {
		return priseEnCompteCDS;
	}


	public void setPriseEnCompteCDS(Date priseEnCompteCDS) {
		this.priseEnCompteCDS = priseEnCompteCDS;
	}


	public Date getDateEstimation() {
		return dateEstimation;
	}


	public void setDateEstimation(Date dateEstimation) {
		this.dateEstimation = dateEstimation;
	}


	public double getDevisEstimation() {
		return devisEstimation;
	}


	public void setDevisEstimation(double devisEstimation) {
		this.devisEstimation = devisEstimation;
	}


	public double getDontGarantie() {
		return dontGarantie;
	}


	public void setDontGarantie(double dontGarantie) {
		this.dontGarantie = dontGarantie;
	}


	public Date getDateFeuVert() {
		return dateFeuVert;
	}


	public void setDateFeuVert(Date dateFeuVert) {
		this.dateFeuVert = dateFeuVert;
	}


	public Date getDateLivraison() {
		return dateLivraison;
	}


	public void setDateLivraison(Date dateLivraison) {
		this.dateLivraison = dateLivraison;
	}


	public boolean isMCO() {
		return MCO;
	}


	public void setMCO(boolean mCO) {
		MCO = mCO;
	}


	public Date getDatePassageMCO() {
		return datePassageMCO;
	}


	public void setDatePassageMCO(Date datePassageMCO) {
		this.datePassageMCO = datePassageMCO;
	}


	public Date getDateSortieMCO() {
		return dateSortieMCO;
	}


	public void setDateSortieMCO(Date dateSortieMCO) {
		this.dateSortieMCO = dateSortieMCO;
	}


	public String getCommentaires() {
		return commentaires;
	}


	public void setCommentaires(String commentaires) {
		this.commentaires = commentaires;
	}


	public int getIdClient() {
		return idClient;
	}


	public void setIdClient(int idClient) {
		this.idClient = idClient;
	}


	public int getIdEtat() {
		return idEtat;
	}


	public void setIdEtat(int idEtat) {
		this.idEtat = idEtat;
	}


	public int getIdTypeDefaut() {
		return idTypeDefaut;
	}


	public void setIdTypeDefaut(int idTypeDefaut) {
		this.idTypeDefaut = idTypeDefaut;
	}


	public int getIdTypeProjet() {
		return idTypeProjet;
	}


	public void setIdTypeProjet(int idTypeProjet) {
		this.idTypeProjet = idTypeProjet;
	}


	// J'ai dû redéfinir equals et hashCode pour éviter les doublons dans la méthode getProjetsByEquipe()
	@Override
	public int hashCode() {
		return Objects.hash(idProjet);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProjetDTO other = (ProjetDTO) obj;
		return idProjet == other.idProjet;
	}
	
	
}
