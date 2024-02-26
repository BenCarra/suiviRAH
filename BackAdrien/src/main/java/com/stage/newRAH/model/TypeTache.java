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
@Table(name="TypeTache")
public class TypeTache {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_type_tache")
	private int idTypeTache;
	
	private String libelle;
	
	@OneToMany(mappedBy="typeTache")
	private List<Tache> listTaches = new ArrayList<>();

	public TypeTache() {
	}

	public TypeTache(int idTypeTache, String libelle) {
		this.idTypeTache = idTypeTache;
		this.libelle = libelle;
	}

}