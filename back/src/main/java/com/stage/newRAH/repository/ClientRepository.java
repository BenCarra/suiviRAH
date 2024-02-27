package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Client;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {

	@Query("SELECT c FROM Client c WHERE nomClient=:nom")
	Optional<Client> findByNom(@Param(value="nom") String nom);

}
