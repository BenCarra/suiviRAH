package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Utilisateur;


@Repository
public interface UtilisateurRepository extends CrudRepository<Utilisateur, Integer> {

    Optional<Utilisateur> findByLogin(String login);

    @Query("SELECT u FROM Utilisateur u WHERE u.nomUtilisateur=:nom")
    Iterable<Utilisateur> findByNom(@Param("nom") String nom);

    @Query("SELECT u FROM Utilisateur u WHERE u.typeUtilisateur.libelle=:libelleTypeUtilisateur")
    Iterable<Utilisateur> findByTypeUtilisateur(@Param("libelleTypeUtilisateur") String libelleTypeUtilisateur);

    @Query("SELECT u FROM Utilisateur u WHERE u.site.nomSite=:nomSite")
    Iterable<Utilisateur> findBySite(@Param("nomSite")String nomSite);
	

}
