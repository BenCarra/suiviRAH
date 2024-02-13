package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.stage.newRAH.model.TypeDefaut;

public interface TypeDefautRepository extends CrudRepository<TypeDefaut, Integer>{

	@Query("SELECT t FROM TypeDefaut t WHERE libelle=:libelle")
	Optional<TypeDefaut> findByLibelle(@Param(value="libelle")String libelle);

}
