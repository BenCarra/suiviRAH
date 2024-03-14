package com.stage.newRAH.model;

import java.sql.Date;

public interface SuiviProjet {
    
    int getIdProjet();
    Client getClient();
    String getNomProjet();
    double getDevisEstimation();
    Etat getEtat();
    double getDureeTache();
    Date getDateTache();

}
