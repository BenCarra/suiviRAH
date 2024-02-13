package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.TypeUtilisateur;

@Repository
public interface TypeUtilisateurRepository extends CrudRepository<TypeUtilisateur, Integer> {

}
