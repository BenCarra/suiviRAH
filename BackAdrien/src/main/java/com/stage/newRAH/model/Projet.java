package com.stage.newRAH.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

>>>>>>> b3185788160d36824140921ee9937b95835881cd
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="Projet")
public class Projet {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_projet")
	private int idProjet;
	
	@Column(name="nom_projet")
	private String nomProjet;
	
	private String jira;
	
	private String techno;
	
	private String service;
	
	@Column(name="date_demande")
	private Date dateDemande;
	
	@Column(name="livraison_souhaitee")
	private Date livraisonSouhaitee;
	
	@Column(name="livraison_revisee")
	private Date livraisonRevisee;
	
	@Column(name="affectation_CDS")
	private Date affectationCDS;
	
	@Column(name="prise_en_compte_CDS")
	private Date priseEnCompteCDS;
	
	@Column(name="date_estimation")
	private Date dateEstimation;
	
	@Column(name="devis_estimation")
	private double devisEstimation;
	
	@Column(name="dont_garantie")
	private double dontGarantie;
	
	@Column(name="date_feu_vert")
	private Date dateFeuVert;
	
	@Column(name="date_livraison")
	private Date dateLivraison;
	
	private boolean MCO;
	
	@Column(name="date_passage_MCO")
	private Date datePassageMCO;
	
	@Column(name="date_sortie_MCO")
	private Date dateSortieMCO;
	
	private String commentaires;

	@OneToMany(mappedBy="projet")
	private List<Tache> listTaches = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name="id_client")
	private Client client;
	
	@ManyToOne
	@JoinColumn(name="id_type_projet")
	private TypeProjet typeProjet;
	
	@ManyToOne
	@JoinColumn(name="id_type_defaut")
	private TypeDefaut typeDefaut;
	
	@ManyToOne
	@JoinColumn(name="id_etat")
	private Etat etat;	
	
	@ManyToMany
	@JoinTable(name="ProjetComposition",
			joinColumns = @JoinColumn(name="id_projet"),
			inverseJoinColumns = @JoinColumn(name="id_composition"))
	private List<Composition> listCompositions;

	public Projet() {
	}

	public Projet(int idProjet, String nomProjet, String jira, String techno, String service, Date dateDemande,
			Date livraisonSouhaitee, Date livraisonRevisee, Date affectationCDS, Date priseEnCompteCDS,
			Date dateEstimation, double devisEstimation, double dontGarantie, Date dateFeuVert, Date dateLivraison,
			boolean mCO, Date datePassageMCO, Date dateSortieMCO, String commentaires, Client client,
			TypeProjet typeProjet, TypeDefaut typeDefaut, Etat etat) {
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
		this.client = client;
		this.typeProjet = typeProjet;
		this.typeDefaut = typeDefaut;
		this.etat = etat;
	}
}
