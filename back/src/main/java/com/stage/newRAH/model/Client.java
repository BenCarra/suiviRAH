package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="client")
public class Client {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_client")
	private int idClient;
	
	@Column(name="nom_client")
	private String nomClient;
	
	@Column(name="adresse_Client")
	private String adresseClient;
	
	@Column(name="code_postal_client")
	private String codePostalClient;
	
	@Column(name="ville_Client")
	private String villeClient;

	@Column(name ="actif")
	private boolean actif;

	@Column(name="mode_fonctionnement_MCO")
	private boolean modeFonctionnementMCO;
	
	@OneToMany(mappedBy="client")
	private List<Projet> listProjets = new ArrayList<>();

	public Client() {
	}

	public Client(int idClient, String nomClient, String adresseClient, String codePostalClient, String villeClient, boolean actif, boolean modeFonctionnementMCO) {
		this.idClient = idClient;
		this.nomClient = nomClient;
		this.adresseClient = adresseClient;
		this.codePostalClient = codePostalClient;
		this.villeClient = villeClient;
		this.actif = actif;
		this.modeFonctionnementMCO = modeFonctionnementMCO;
	}
}
