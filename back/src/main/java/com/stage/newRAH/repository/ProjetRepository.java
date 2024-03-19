package com.stage.newRAH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.stage.newRAH.model.Projet;
import com.stage.newRAH.model.SuiviProjet;

@Repository
public interface ProjetRepository extends CrudRepository<Projet, Integer> {

    /*
     * Pour permettre l'opération de projection JPA en JPQL, on définit une
     * interface SuiviProjet. Spring crée une instance proxy de l'interface de
     * projection pour chaque objet entité, et tous les appels au proxy sont
     * transmis à cet objet.
     * Lorsque chaque méthode getter correspond au nom de l'un des champs d'entité,
     * une telle projection est appelée projection fermée, ce qui signifie que
     * Spring Data JPA récupère uniquement les colonnes de la base de données
     * incluses dans la projection.
     */

    // Récupération du suivi de projets avec durées des tâches par année. Jointure
    // sur idProjet, car à un projet est associé un seul client
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet GROUP BY nomProjet,client,year(dateTache) HAVING (year(dateTache)>year(now())-4) ORDER BY client,nomProjet,year(dateTache) ASC")
    public List<SuiviProjet> getSuiviProjets();

    // Récupération du suivi de projets pour afficher les durées totales par projet
    // 
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE (year(dateTache)>year(now())-4) GROUP BY nomProjet,client")
    public List<SuiviProjet> getSuiviProjetsDureeTotale();

    // Récupération du suivi des projets non terminés avec durées des tâches par
    // année
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle<>'terminé' GROUP BY nomProjet,client,year(dateTache) HAVING (year(dateTache)>year(now())-4) ORDER BY client,nomProjet,year(dateTache) ASC")
    public List<SuiviProjet> getSuiviProjetsNonTermines();

    // Récupération du suivi des projets terminés avec durées des tâches par
    // année
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle='terminé' GROUP BY nomProjet,client,year(dateTache) HAVING (year(dateTache)>year(now())-4) ORDER BY client,nomProjet,year(dateTache) ASC")
    public List<SuiviProjet> getSuiviProjetsTermines();

    // Récupération du suivi des projets non terminés pour afficher les durées totales
    // par projet 
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle<>'terminé' AND (year(dateTache)>year(now())-4) GROUP BY nomProjet,client")
    public List<SuiviProjet> getSuiviProjetsNonTerminesDureeTotale();

    // Récupération du suivi des projets terminés pour afficher les durées totales
    // par projet 
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle='terminé' AND (year(dateTache)>year(now())-4) GROUP BY nomProjet,client")
    public List<SuiviProjet> getSuiviProjetsTerminesDureeTotale();

    // Récupération du suivi des projets par client avec la durée des tâches par
    // année
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE client.nomClient=:nomClient GROUP BY nomProjet,client,year(dateTache) HAVING (year(dateTache)>year(now())-4) ORDER BY client,nomProjet,year(dateTache) ASC")
    public List<SuiviProjet> getSuiviProjetsByClient(@Param(value = "nomClient") String nomClient);

    // Récupération du suivi des projets par client pour afficher les durées totales
    // par projet 
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE (year(dateTache)>year(now())-4) AND client.nomClient=:nomClient GROUP BY nomProjet,client")
    public List<SuiviProjet> getSuiviProjetsByClientDureeTotale(@Param(value = "nomClient") String nomClient);

    // Récupération du suivi des projets non terminés par client avec la durée des tâches par
    // année
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle<>'terminé' AND client.nomClient=:nomClient GROUP BY nomProjet,client,year(dateTache) HAVING (year(dateTache)>year(now())-4) ORDER BY client,nomProjet,year(dateTache) ASC")
    public List<SuiviProjet> getSuiviProjetsNonTerminesByClient(String nomClient);

    // Récupération du suivi des projets terminés par client avec la durée des tâches par
    // année
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle='terminé' AND client.nomClient=:nomClient GROUP BY nomProjet,client,year(dateTache) HAVING (year(dateTache)>year(now())-4) ORDER BY client,nomProjet,year(dateTache) ASC")
    public List<SuiviProjet> getSuiviProjetsTerminesByClient(String nomClient);

    // Récupération du suivi des projets non terminés par client pour afficher les durées totales
    // par projet 
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle<>'terminé' AND (year(dateTache)>year(now())-4) AND client.nomClient=:nomClient GROUP BY nomProjet,client")
    public List<SuiviProjet> getSuiviProjetsNonTerminesByClientDureeTotale(String nomClient);

    // Récupération du suivi des projets terminés par client pour afficher les durées totales
    // par projet 
    @Query("SELECT p.idProjet as idProjet, p.client as client, p.nomProjet as nomProjet, p.devisEstimation as devisEstimation, p.etat as etat, sum(t.dureeTache) as dureeTache, t.dateTache as dateTache FROM Projet p JOIN Tache t ON t.projet.idProjet=idProjet WHERE etat.libelle='terminé' AND (year(dateTache)>year(now())-4) AND client.nomClient=:nomClient GROUP BY nomProjet,client")
    public List<SuiviProjet> getSuiviProjetsTerminesByClientDureeTotale(String nomClient);

}