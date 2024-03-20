package com.stage.newRAH.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stage.newRAH.dto.RDSDTO;
import com.stage.newRAH.model.RDS;
import com.stage.newRAH.repository.RDSRepository;

@Service
public class RDSService {

    @Autowired
    RDSRepository rdsRepository;

    public RDSDTO mapRDStoDTO(RDS rds){
        RDSDTO rdsDTO = new RDSDTO();

        rdsDTO.setIdRDS(rds.getIdRDS());
        rdsDTO.setNom(rds.getNom());
        rdsDTO.setDirection(rds.getDirection());
        rdsDTO.setService(rds.getService());

        return rdsDTO;
    }

    public ResponseEntity<List<RDSDTO>> getRDS(){
        Iterable<RDS> rds = rdsRepository.findAll();

        if (rds.iterator().hasNext()) {
            List<RDSDTO> listRDS = new ArrayList<>();
            for (RDS r : rds) {
                RDSDTO rdsDTO = this.mapRDStoDTO(r);
                listRDS.add(rdsDTO);
            }
            return ResponseEntity.ok(listRDS);

        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<List<RDSDTO>> getRDSByNom(String nom){
        Iterable<RDS> rds = rdsRepository.findByNom(nom);

        if (rds.iterator().hasNext()) {
            List<RDSDTO> listRDS = new ArrayList<>();
            for (RDS r : rds) {
                RDSDTO rdsDTO = this.mapRDStoDTO(r);
                listRDS.add(rdsDTO);
            }
            return ResponseEntity.ok(listRDS);

        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<RDSDTO> createRDS(RDSDTO rdsDTO) {
        RDS rdsACreer = new RDS();

        rdsACreer.setNom(rdsDTO.getNom());
        rdsACreer.setDirection(rdsDTO.getDirection());
        rdsACreer.setService(rdsDTO.getService());

        rdsRepository.save(rdsACreer);

        RDSDTO rdsACreerDTO = this.mapRDStoDTO(rdsACreer);

        return ResponseEntity.ok(rdsACreerDTO);
    }

    public ResponseEntity<RDSDTO> updateRDS(RDSDTO rdsDTO, int id) {
        Optional<RDS> rdsAModifierOptional = rdsRepository.findById(id);

        if (rdsAModifierOptional.isPresent()) {

            RDS rdsAModifier = rdsAModifierOptional.get();

            rdsAModifier.setNom(rdsDTO.getNom());
            rdsAModifier.setDirection(rdsDTO.getDirection());
            rdsAModifier.setService(rdsDTO.getService());

            rdsRepository.save(rdsAModifier);

            RDSDTO rdsAModifierDTO = this.mapRDStoDTO(rdsAModifier);

            return ResponseEntity.ok(rdsAModifierDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
