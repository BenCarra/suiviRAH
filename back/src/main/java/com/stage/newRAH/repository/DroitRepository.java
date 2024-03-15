package com.stage.newRAH.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Droit;

@Repository
public interface DroitRepository extends CrudRepository<Droit, Integer>{

	@Query("SELECT d FROM Droit d WHERE d.typeUtilisateur.idTypeUtilisateur=:id_type_utilisateur")
	Iterable<Droit> findByTypeUtilisateur(@Param(value = "id_type_utilisateur")int idTypeUtilisateur);


}
