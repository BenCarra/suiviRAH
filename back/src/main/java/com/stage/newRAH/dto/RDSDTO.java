package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class RDSDTO {

    private int idRDS;
    private String nom;
    private String direction;
    private String service;

    public RDSDTO(){

    }

    public RDSDTO(int idRDS, String nom, String direction, String service) {
        this.idRDS = idRDS;
        this.nom = nom;
        this.direction = direction;
        this.service = service;
    }

    

}
