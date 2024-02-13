package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Equipe;

@Repository
public interface EquipeRepository extends CrudRepository<Equipe, Integer> {

	// Conversion de Optional<Equipe> en Equipe 
	Equipe findById(int id);
}
