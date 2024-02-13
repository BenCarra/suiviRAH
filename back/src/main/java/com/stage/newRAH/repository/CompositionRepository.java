package com.stage.newRAH.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.stage.newRAH.model.Composition;
import com.stage.newRAH.model.Equipe;

public interface CompositionRepository extends CrudRepository<Composition, Integer>{
	
	List<Composition> findByEquipe(Equipe equipe);

}
