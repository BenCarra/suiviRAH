package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="TypeUtilisateur")
public class TypeUtilisateur {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_type_utilisateur")
	private int idTypeUtilisateur;
	
	private String libelle;
	
	@OneToMany(mappedBy="typeUtilisateur", targetEntity=Utilisateur.class)
	private List<Utilisateur> listUtilisateurs = new ArrayList<>();

	@ManyToMany(mappedBy = "listTypeUtilisateurs")
    private List<Fonctionnalite> listFonctionnalites = new ArrayList<>();

	
	public TypeUtilisateur() {
	}
	
	public TypeUtilisateur(int id_type_utilisateur, String libelle) {
		this.idTypeUtilisateur = id_type_utilisateur;
		this.libelle = libelle;
	}

}
