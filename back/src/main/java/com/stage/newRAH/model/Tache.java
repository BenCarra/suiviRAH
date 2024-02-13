package com.stage.newRAH.model;

import java.time.LocalDateTime;
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
@Entity
@Table(name="Tache")
public class Tache {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_tache")
	private int idTache;
	
	@Column(name="nom_tache")
	private String nomTache;
	
	@Column(name="debut_tache", columnDefinition="datetime")
	private LocalDateTime debutTache;
	
	@Column(name="fin_tache", columnDefinition="datetime")
	private LocalDateTime finTache;
	
	private String commentaires;
	

	@ManyToMany(mappedBy="listTaches")
	private List<Utilisateur> listUtilisateurs = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name="id_type_tache")
	private TypeTache typeTache;
	
	@ManyToOne
	@JoinColumn(name="id_projet")
	private Projet projet;
	
	public Tache() {
	}

	public Tache(int idTache, String nomTache, LocalDateTime debutTache, LocalDateTime finTache, String commentaires,
			TypeTache typeTache, Projet projet) {
		this.idTache = idTache;
		this.nomTache = nomTache;
		this.debutTache = debutTache;
		this.finTache = finTache;
		this.commentaires = commentaires;
		this.typeTache = typeTache;
		this.projet = projet;
	}
	
}
