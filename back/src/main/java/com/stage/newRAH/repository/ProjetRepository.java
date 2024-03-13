package com.stage.newRAH.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.SuiviProjet;

@Repository
public interface ProjetRepository extends CrudRepository<Projet, Integer> {
  
    /* Pour permettre l'opération de projection JPA en JPQL, on définit une interface SuiviProjet.
    Lorsque chaque méthode getter correspond au nom de l'un des champs d'entité, une telle projection est appelée projection fermée, ce qui signifie que Spring Data JPA récupère uniquement les colonnes de la base de données incluses dans la projection.*/
    @Query("SELECT p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat FROM Projet p")
    public Iterable<SuiviProjet> getSuiviProjets();

    @Query("SELECT p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat FROM Projet p WHERE client.nomClient=:nomClient")
    public Iterable<SuiviProjet> getSuiviProjetsByClient(@Param(value = "nomClient") String nomClient);

}
