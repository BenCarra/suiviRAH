package com.stage.newRAH.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="equipe")
public class Equipe {
	
	@Id
	@Column(name="id_equipe")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idEquipe;
	
	private String libelle;
	
	@ManyToMany
	@JoinTable(
			name = "Composition",
			joinColumns = @JoinColumn(name="id_equipe"),
			inverseJoinColumns = @JoinColumn(name ="id_utilisateur")
			)
	List<Utilisateur> listUtilisateurs = new ArrayList<>();
	
	// J'ai rajouté ce lien entre Equipe et Composition
	@OneToMany(mappedBy="equipe")
	private List<Composition> listCompositions;
	
	public Equipe() {
		
	}

	public Equipe(int idEquipe) {
		this.idEquipe = idEquipe;
	}
	
}
