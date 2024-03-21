package com.stage.newRAH.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stage.newRAH.dto.RDSDTO;
import com.stage.newRAH.service.RDSService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RDSController {

    @Autowired
    RDSService rdsService;

    @GetMapping("/rds")
    public ResponseEntity<List<RDSDTO>> getRDS(){
        return rdsService.getRDS();
    }

    @GetMapping("/rdsById/{id}")
    public ResponseEntity<RDSDTO> getRDSById(@PathVariable int id){
        return rdsService.getRDSById(id);
    }

    @GetMapping("/rdsByNom/{nom}")
    public ResponseEntity<List<RDSDTO>> getRDSByNom(@PathVariable String nom){
        return rdsService.getRDSByNom(nom);
    }

    @PostMapping("/createRDS")
    public ResponseEntity<RDSDTO> createRDS(@RequestBody RDSDTO rdsDTO){
        return rdsService.createRDS(rdsDTO);
    }

    @PutMapping("/updateRDS/{id}")
    public ResponseEntity<RDSDTO> createRDS(@RequestBody RDSDTO rdsDTO, @PathVariable int id){
        return rdsService.updateRDS(rdsDTO, id);
    }

}
