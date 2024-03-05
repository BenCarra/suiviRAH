package com.stage.newRAH.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;
import com.stage.newRAH.model.Utilisateur;

public interface CompositionRepository extends CrudRepository<Composition, Integer>{

	@Query("SELECT c FROM Composition c WHERE c.equipe=:equipe")
	Iterable<Composition> findByEquipe(@Param(value="equipe") Equipe equipe);

	@Query("SELECT c FROM Composition c WHERE c.utilisateur=:utilisateur")
	Iterable<Composition> findByUtilisateur(@Param(value="utilisateur") Utilisateur utilisateur);

	
}
