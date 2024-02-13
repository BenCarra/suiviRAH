package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Site;

@Repository
public interface SiteRepository extends CrudRepository<Site, Integer> {

}
