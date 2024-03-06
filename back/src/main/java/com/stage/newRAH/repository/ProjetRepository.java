package com.stage.newRAH.repository;



import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.stage.newRAH.model.Projet;

@Repository
public interface ProjetRepository extends CrudRepository<Projet, Integer> {
  
}
