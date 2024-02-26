package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.TypeTacheDTO;
import com.stage.newRAH.service.TypeTacheService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TypeTacheController {

    @Autowired
    TypeTacheService typeTacheService;

    @GetMapping("/typeTaches")
    public ResponseEntity<List<TypeTacheDTO>> getTypeTaches() {
        return typeTacheService.getTypeTaches();

    }

}
