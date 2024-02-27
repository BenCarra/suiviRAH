package com.stage.newRAH.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Site;

@Repository
public interface SiteRepository extends CrudRepository<Site, Integer> {

	@Query("SELECT s FROM Site s WHERE nomSite=:nom")
	Optional<Site> findByNom(@Param(value="nom") String nom);

}
