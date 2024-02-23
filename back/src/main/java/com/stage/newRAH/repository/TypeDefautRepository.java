package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;

import com.stage.newRAH.model.TypeDefaut;

public interface TypeDefautRepository extends CrudRepository<TypeDefaut, Integer> {
    TypeDefaut findByLibelle (String libelle);

}
