package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.List;

<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

>>>>>>> b3185788160d36824140921ee9937b95835881cd
import jakarta.persistence.CascadeType;
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
@Table(name="Utilisateur")
public class Utilisateur {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_utilisateur")
	private int idUtilisateur;
	
	@Column(name="nom_utilisateur")
	private String nomUtilisateur;
	
	@Column(name="prenom_utilisateur")
	private String prenomUtilisateur;
	
	private String login ;
	
	private String mail;

	@ManyToOne (targetEntity=Site.class)
	@JoinColumn(name="id_site")
	private Site site;
	
	private boolean actif;
	
	@ManyToOne (targetEntity=TypeUtilisateur.class)
	@JoinColumn(name="id_type_utilisateur")
	private TypeUtilisateur typeUtilisateur;
	
	@ManyToMany 
	@JoinTable(name="UtilisateurTache",
					joinColumns = @JoinColumn(name="id_utilisateur"),
					inverseJoinColumns = @JoinColumn(name="id_tache"))
	private List<Tache> listTaches = new ArrayList<>();
	
	@ManyToMany(mappedBy="listUtilisateurs")
	private List<Equipe> listEquipes = new ArrayList<>();
	
	// J'ai rajouté ce lien entre Utilisateur et Composition
	@OneToMany(mappedBy="utilisateur", cascade = CascadeType.ALL)
	private List<Composition> listCompositions;
	
		
	public Utilisateur() {

	}


	public Utilisateur(int idUtilisateur, String nomUtilisateur, String prenomUtilisateur, String login, String mail,
			Site site, boolean actif, TypeUtilisateur typeUtilisateur) {

		this.idUtilisateur = idUtilisateur;
		this.nomUtilisateur = nomUtilisateur;
		this.prenomUtilisateur = prenomUtilisateur;
		this.login = login;
		this.mail = mail;
		this.site = site;
		this.actif = actif;
		this.typeUtilisateur = typeUtilisateur;
	}

}
