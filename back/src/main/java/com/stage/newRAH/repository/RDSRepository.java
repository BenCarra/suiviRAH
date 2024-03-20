package com.stage.newRAH.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.RDS;

@Repository
public interface RDSRepository extends CrudRepository<RDS, Integer>{

    @Query("SELECT r FROM RDS r WHERE r.nom=:nom")
    Iterable<RDS> findByNom(@Param(value="nom") String nom);

}
