package com.stage.newRAH.dto;

import java.sql.Date;
import java.util.Objects;

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
