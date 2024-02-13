package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Fonctionnalite;

@Repository
public interface FonctionnaliteRepository extends CrudRepository<Fonctionnalite, Integer> {

	@Query(value ="SELECT f from Fonctionnalite f WHERE f.libelle=:libelle")
	Optional<Fonctionnalite> findByLibelle(@Param("libelle") String libelle);

}
