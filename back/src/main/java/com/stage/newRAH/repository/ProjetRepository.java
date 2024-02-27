package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Projet;

@Repository
public interface ProjetRepository extends CrudRepository<Projet, Integer> {

	@Query("SELECT p FROM Projet p WHERE nomProjet=:nom")
	Optional<Projet> findByNom(@Param(value="nom") String nom);

	@Query("SELECT p FROM Projet p WHERE client.idClient=:idClient")
	Iterable<Projet> findByClient(@Param(value="idClient")int idClient);


}
