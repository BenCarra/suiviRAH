package com.stage.newRAH.repository;



import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Fonctionnalite;

@Repository
public interface FonctionnaliteRepository extends CrudRepository<Fonctionnalite, Integer> {
	
}
