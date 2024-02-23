package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;

import com.stage.newRAH.model.Etat;


public interface EtatRepository extends CrudRepository<Etat, Integer> {
    Etat findByLibelle(String libelle);

}
