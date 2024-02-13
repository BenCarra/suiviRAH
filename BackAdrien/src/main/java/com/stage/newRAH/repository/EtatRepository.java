package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.stage.newRAH.model.Etat;

public interface EtatRepository extends CrudRepository<Etat, Integer>{

	@Query("SELECT e FROM Etat e WHERE libelle=:libelle")
	Optional<Etat> findByLibelle(@Param(value="libelle")String libelle);

}
