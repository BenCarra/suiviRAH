package com.stage.newRAH.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Utilisateur;


@Repository
public interface UtilisateurRepository extends CrudRepository<Utilisateur, Integer> {

    @Query("SELECT u FROM Utilisateur u WHERE u.nomUtilisateur=:nom")
    Iterable<Utilisateur> findByNom(@Param("nom") String nom);
	

}
