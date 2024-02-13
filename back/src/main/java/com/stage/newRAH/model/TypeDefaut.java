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
@Table(name="TypeDefaut")
public class TypeDefaut {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_type_defaut")
	private int idTypeDefaut;
	
	private String libelle;
	
	@OneToMany(mappedBy="typeDefaut")
	private List<Projet> listProjets = new ArrayList<>();
	
	public TypeDefaut() {
		
	}
	
	public TypeDefaut(int idTypeDefaut, String libelle) {

		this.idTypeDefaut = idTypeDefaut;
		this.libelle = libelle;
	}
}
