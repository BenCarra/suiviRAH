package com.stage.newRAH.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="Droit")
public class Droit {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_droit")
    private int idDroit;
	
	@Column(name="a_droit")
	private boolean aDroit;
    
	@ManyToOne
    @JoinColumn(name = "id_fonctionnalite")
    private Fonctionnalite fonctionnalite;

    @ManyToOne
    @JoinColumn(name = "id_type_utilisateur")
    private TypeUtilisateur typeUtilisateur;

	public Droit() {
	}

	public Droit(int idDroit, boolean aDroit, Fonctionnalite fonctionnalite, TypeUtilisateur typeUtilisateur) {

		this.idDroit = idDroit;
		this.aDroit = aDroit;
		this.fonctionnalite = fonctionnalite;
		this.typeUtilisateur = typeUtilisateur;
	}

	
}
