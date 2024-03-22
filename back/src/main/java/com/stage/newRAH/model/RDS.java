package com.stage.newRAH.model;

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
@Table(name="RDS")
public class RDS {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id_rds")
    private int idRDS;

    private String nom;

    private String direction;

    private String service;

    @OneToMany(mappedBy = "rds")
    private List<Projet> listProjets;

    public RDS(){

    }

    public RDS(int idRDS, String nom, String direction, String service) {
        this.idRDS = idRDS;
        this.nom = nom;
        this.direction = direction;
        this.service = service;
    }   
    
    

}
