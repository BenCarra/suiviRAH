package com.stage.newRAH.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.stage.newRAH.model.Droit;
import com.stage.newRAH.model.TypeUtilisateur;

public interface DroitRepository extends CrudRepository<Droit, Integer> {

    List<Droit> findByTypeUtilisateur(TypeUtilisateur typeUtilisateur);

}
