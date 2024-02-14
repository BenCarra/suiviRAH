package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.TypeTache;

@Repository
public interface TypeTacheRepository extends CrudRepository<TypeTache, Integer> {

	@Query("SELECT t FROM TypeTache t WHERE libelle=:libelle")
	Optional<TypeTache> findByLibelle(@Param(value="libelle")String libelle);

}
