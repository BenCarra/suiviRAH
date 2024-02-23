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
@Table(name="Site")
public class Site {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_site")
	private int idSite;
	
	@Column(name="nom_site")
	private String nomSite;
	
	@Column(name="adresse_site")
	private String adresseSite;
	
	@Column(name="code_postal_site")
	private String codePostalSite;
	
	@Column(name="ville_site")
	private String villeSite;
	
	@OneToMany(mappedBy="site", targetEntity=Utilisateur.class)
	@JsonBackReference() // Manages the reverse part of the reference and the fields/collections marked with this annotation are not serialised.
	private List<Utilisateur> listUtilisateurs = new ArrayList<>();

	public Site() {
	}

	public Site(int idSite, String nomSite, String adresseSite, String codePostalSite, String villeSite) {
		this.idSite = idSite;
		this.nomSite = nomSite;
		this.adresseSite = adresseSite;
		this.codePostalSite = codePostalSite;
		this.villeSite = villeSite;
	}
}
