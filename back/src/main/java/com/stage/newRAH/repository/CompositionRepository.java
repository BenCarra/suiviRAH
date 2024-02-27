package com.stage.newRAH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;

public interface CompositionRepository extends CrudRepository<Composition, Integer>{

	@Query("SELECT c FROM Composition c WHERE c.equipe=:equipe")
	List<Composition> findByEquipe(@Param(value="equipe")Equipe equipe);
	
}
