package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.TypeTache;

@Repository
public interface TypeTacheRepository extends CrudRepository<TypeTache, Integer> {

}
