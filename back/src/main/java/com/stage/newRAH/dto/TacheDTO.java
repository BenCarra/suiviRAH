package com.stage.newRAH.dto;

import java.time.LocalDateTime;

public class TacheDTO {
	
		private int idTache;
	    private String nomTache;
	    private LocalDateTime debutTache;
	    private LocalDateTime finTache;
	    private String commentaires;
	    private int idTypeTache;
	    private int idProjet;
	    
		public TacheDTO() {
		}

		public TacheDTO(int idTache, String nomTache, LocalDateTime debutTache, LocalDateTime finTache,
				String commentaires, int idTypeTache, int idProjet) {
		
			this.idTache = idTache;
			this.nomTache = nomTache;
			this.debutTache = debutTache;
			this.finTache = finTache;
			this.commentaires = commentaires;
			this.idTypeTache = idTypeTache;
			this.idProjet = idProjet;
		}

		public int getIdTache() {
			return idTache;
		}

		public void setIdTache(int idTache) {
			this.idTache = idTache;
		}

		public String getNomTache() {
			return nomTache;
		}

		public void setNomTache(String nomTache) {
			this.nomTache = nomTache;
		}

		public LocalDateTime getDebutTache() {
			return debutTache;
		}

		public void setDebutTache(LocalDateTime debutTache) {
			this.debutTache = debutTache;
		}

		public LocalDateTime getFinTache() {
			return finTache;
		}

		public void setFinTache(LocalDateTime finTache) {
			this.finTache = finTache;
		}

		public String getCommentaires() {
			return commentaires;
		}

		public void setCommentaires(String commentaires) {
			this.commentaires = commentaires;
		}

		public int getIdTypeTache() {
			return idTypeTache;
		}

		public void setIdTypeTache(int idTypeTache) {
			this.idTypeTache = idTypeTache;
		}

		public int getIdProjet() {
			return idProjet;
		}

		public void setIdProjet(int idProjet) {
			this.idProjet = idProjet;
		}		
}
