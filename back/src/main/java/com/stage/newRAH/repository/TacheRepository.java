package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Tache;

@Repository
public interface TacheRepository extends CrudRepository<Tache, Integer> {

	
}
