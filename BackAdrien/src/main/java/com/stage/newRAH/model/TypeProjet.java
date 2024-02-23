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
@Table(name="TypeProjet")
public class TypeProjet {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_type_projet")
	private int idTypeProjet;
	
	private String libelle;
	
	@OneToMany(mappedBy="typeProjet")
	@JsonBackReference
	private List<Projet> listProjets = new ArrayList<>();
	
	public TypeProjet() {
		
	}

	public TypeProjet(int idTypeProjet, String libelle) {
		
		this.idTypeProjet = idTypeProjet;
		this.libelle = libelle;
	}
}
