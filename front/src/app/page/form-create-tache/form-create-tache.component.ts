import { Component, OnInit } from '@angular/core';
import { TypeTache } from '../../shared/model/type-tache';
import { TypeTacheService } from '../../shared/service/type-tache.service';
import { CommonModule } from '@angular/common';
import { ProjetService } from '../../shared/service/projet.service';
import { Projet } from '../../shared/model/projet';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-create-tache',
  standalone: true,
  imports: [CommonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatDatepickerModule,
    ReactiveFormsModule ],
  templateUrl: './form-create-tache.component.html',
  styleUrl: './form-create-tache.component.css'
})

export class FormCreateTacheComponent implements OnInit {

  monFormulaire: FormGroup;
  typeTaches!: TypeTache[];
  projets!: Projet[];

  constructor(private typeTacheService:TypeTacheService, private projetService : ProjetService) {
    this.monFormulaire=new FormGroup({
      'nomTache': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.typeTacheService.findAll().subscribe(data => {
      this.typeTaches = data;
    })

    this.projetService.findAll().subscribe(data => {
      this.projets = data;
    })
  }

  

}
