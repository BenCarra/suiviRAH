package com.stage.newRAH.repository;

import org.springframework.data.repository.CrudRepository;

import com.stage.newRAH.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}
