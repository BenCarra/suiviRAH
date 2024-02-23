package com.stage.newRAH.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class TacheDTO {
	
		private int idTache;
	    private String nomTache;
	    private LocalDateTime debutTache;
	    private LocalDateTime finTache;
	    private String commentaires;
	    private String libelleTypeTache;
	    private String nomProjet;
		private List<String> listNomsUtilisateurs;
	    
		public TacheDTO() {
		}



	public TacheDTO(int idTache, String nomTache, LocalDateTime debutTache, LocalDateTime finTache, String commentaires, String libelleTypeTache, String nomProjet) {
		this.idTache = idTache;
		this.nomTache = nomTache;
		this.debutTache = debutTache;
		this.finTache = finTache;
		this.commentaires = commentaires;
		this.libelleTypeTache = libelleTypeTache;
		this.nomProjet = nomProjet;
	}
	

		
	}