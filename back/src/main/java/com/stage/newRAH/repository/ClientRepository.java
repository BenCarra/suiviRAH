package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stage.newRAH.model.Client;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {

}
