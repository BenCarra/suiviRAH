package com.stage.newRAH.repository;

import java.sql.Date;

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

    /* */
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.nomProjet=nomProjet GROUP BY (nomProjet,client,year(dateTache))")
    public Iterable<SuiviProjet> getSuiviProjets();

    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.nomProjet=nomProjet WHERE client.nomClient=:nomClient GROUP BY (nomProjet,client,year(dateTache))")
    public Iterable<SuiviProjet> getSuiviProjetsByClient(@Param(value = "nomClient") String nomClient);

    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, t.dureeTache as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.nomProjet=nomProjet WHERE year(dateTache)=:annee")
    public Iterable<SuiviProjet> getSuiviProjetsByAnnee(@Param(value="annee") int annee);

    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, t.dureeTache as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.nomProjet=nomProjet WHERE client.nomClient=:nomClient and year(dateTache)=:annee")
    public Iterable<SuiviProjet> getSuiviProjetsByClientByAnnee(@Param(value = "nomClient") String nomClient, @Param(value="annee") int annee);

    // TODO: durée totale des tâches par projet)
    /*@Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache FROM Projet p JOIN Tache t ON t.projet.idProjet=p.idProjet GROUP BY (p.idProjet,p.client)")
    public Iterable<SuiviProjet> getSuiviProjets();

    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache FROM Projet p JOIN Tache t ON t.projet.idProjet=p.idProjet WHERE client.nomClient=:nomClient GROUP BY (p.idProjet,p.client)")
    public Iterable<SuiviProjet> getSuiviProjetsByClient(@Param(value = "nomClient") String nomClient);*/

}