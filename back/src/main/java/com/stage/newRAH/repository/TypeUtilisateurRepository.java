package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.TypeUtilisateur;

@Repository
public interface TypeUtilisateurRepository extends CrudRepository<TypeUtilisateur, Integer> {

	@Query("SELECT t FROM TypeUtilisateur t WHERE libelle=:libelle")
	Iterable<TypeUtilisateur> findByLibelle(@Param(value="libelle")String libelle);

}
