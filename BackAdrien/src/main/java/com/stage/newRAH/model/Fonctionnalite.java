package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="Fonctionnalite")
public class Fonctionnalite {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_fonctionnalite")
	private int idFonctionnalite;
	
	private String libelle;
	
	@ManyToMany
    @JoinTable(
        name = "Droit",
        joinColumns = @JoinColumn(name = "id_fonctionnalite"),
        inverseJoinColumns = @JoinColumn(name = "id_type_utilisateur"))
    private List<TypeUtilisateur> listTypeUtilisateurs = new ArrayList<>();
	
	public Fonctionnalite() {
		
	}

	public Fonctionnalite(int idFonctionnalite, String libelle) {
		this.idFonctionnalite = idFonctionnalite;
		this.libelle = libelle;
	}
}

