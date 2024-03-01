package com.stage.newRAH.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Equipe;

@Repository
public interface EquipeRepository extends CrudRepository<Equipe, Integer> {

    @Query("SELECT e FROM Equipe e WHERE e.libelle=:libelle")
    Iterable<Equipe> findByLibelle(@Param("libelle") String libelle);

}
