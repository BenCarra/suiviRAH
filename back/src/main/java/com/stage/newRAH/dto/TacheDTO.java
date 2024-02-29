package com.stage.newRAH.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
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

}
