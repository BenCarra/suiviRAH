package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
	
	@OneToMany(mappedBy="client")
	@JsonBackReference
	private List<Projet> listProjets = new ArrayList<>();

	public Client() {
	}

	public Client(int idClient, String nomClient, String adresseClient, String codePostalClient, String villeClient) {
		this.idClient = idClient;
		this.nomClient = nomClient;
		this.adresseClient = adresseClient;
		this.codePostalClient = codePostalClient;
		this.villeClient = villeClient;
	}
}
