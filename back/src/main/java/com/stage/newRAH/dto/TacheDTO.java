package com.stage.newRAH.dto;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class TacheDTO {
	
		private int idTache;
	    private String nomTache;
	    private Date dateTache;
	    private double dureeTache;
	    private String commentaires;
		private boolean mco;
		private boolean nouvelleDemande;	
	    private String libelleTypeTache;
	    private String nomProjet;
		private List<Integer> listIdUtilisateurs;
	    
		public TacheDTO() {
		}



	public TacheDTO(int idTache, String nomTache, Date dateTache, double dureeTache, String commentaires, 
	boolean mco, boolean nouvelleDemande, String libelleTypeTache, String nomProjet) {
		this.idTache = idTache;
		this.nomTache = nomTache;
		this.dateTache = dateTache;
		this.dureeTache = dureeTache;
		this.commentaires = commentaires;
		this.mco = mco;
		this.nouvelleDemande = nouvelleDemande;
		this.libelleTypeTache = libelleTypeTache;
		this.nomProjet = nomProjet;
	}
	
	
}