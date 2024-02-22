package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity // Toute entité doit avoir un id auto-incrémenté
@Table(name="composition")
public class Composition {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_composition")
	private int idComposition;
	
	@ManyToOne
	@JoinColumn(name="id_equipe")
	private Equipe equipe;
	
	@ManyToOne
	@JoinColumn(name="id_utilisateur")
	private Utilisateur utilisateur;
	
	@ManyToMany(mappedBy="listCompositions")
	private List<Projet> listProjets = new ArrayList<>();
	
	
	public Composition() {
		
	}

	public Composition(int idComposition, Equipe equipe, Utilisateur utilisateur) {

		this.idComposition = idComposition;
		this.equipe = equipe;
		this.utilisateur = utilisateur;
	}	

}
