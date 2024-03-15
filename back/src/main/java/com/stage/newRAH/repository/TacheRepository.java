package com.stage.newRAH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Tache;

@Repository
public interface TacheRepository extends CrudRepository<Tache, Integer> {

    // Réupération des années liées à toutes les tâches. On ne prend en compte que les 4 dernières années
    @Query(value="SELECT DISTINCT year(t.date_tache) as annee FROM tache t WHERE year(t.date_tache)>year(now())-4 ORDER BY year(t.date_tache) ASC;", nativeQuery=true)
    public List<Integer> getListAnneesTaches();
}
