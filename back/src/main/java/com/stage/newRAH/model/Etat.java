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
@Table(name="etat")
public class Etat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_etat")
	private int idEtat;
	
	private String libelle;
	
	@OneToMany(mappedBy="etat")
	private List<Projet> listProjets = new ArrayList<>();
	
	public Etat( ) {
		
	}

	public Etat(int idEtat, String libelle) {
		this.idEtat = idEtat;
		this.libelle = libelle;
	}
}
