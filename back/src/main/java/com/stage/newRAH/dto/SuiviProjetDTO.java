package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class SuiviProjetDTO {

    private int idProjet;
    private String nomClient;
	private String nomProjet;
	private double devisEstimation;
	private String libelleEtat;
    private double dureeTache;
    private int anneeTache;

    public SuiviProjetDTO(){

    }

    public SuiviProjetDTO(int idProjet, String nomClient, String nomProjet, double devisEstimation, String libelleEtat, double dureeTache, int anneeTache) {
        this.idProjet = idProjet;
        this.nomClient = nomClient;
        this.nomProjet = nomProjet;
        this.devisEstimation = devisEstimation;
        this.libelleEtat = libelleEtat;
        this.dureeTache = dureeTache;
        this.anneeTache = anneeTache;
    }

}
