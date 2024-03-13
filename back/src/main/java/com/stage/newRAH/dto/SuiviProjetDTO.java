package com.stage.newRAH.dto;

import lombok.Data;

@Data
public class SuiviProjetDTO {

    private String nomClient;
	private String nomProjet;
	private double devisEstimation;
	private String libelleEtat;

    public SuiviProjetDTO(){

    }

    public SuiviProjetDTO(String nomClient, String nomProjet, double devisEstimation, String libelleEtat) {
        this.nomClient = nomClient;
        this.nomProjet = nomProjet;
        this.devisEstimation = devisEstimation;
        this.libelleEtat = libelleEtat;
    }

}
