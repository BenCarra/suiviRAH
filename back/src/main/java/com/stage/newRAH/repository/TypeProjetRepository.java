package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.stage.newRAH.model.TypeProjet;

public interface TypeProjetRepository extends CrudRepository<TypeProjet, Integer>{

	@Query("SELECT t FROM TypeProjet t WHERE libelle=:libelle")
	Optional<TypeProjet> findByLibelle(@Param(value="libelle") String libelle);

}
