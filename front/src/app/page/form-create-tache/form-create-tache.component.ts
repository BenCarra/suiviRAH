import { Component, OnInit } from '@angular/core';
import { TypeTache } from '../../shared/model/type-tache';
import { TypeTacheService } from '../../shared/service/type-tache.service';
import { CommonModule } from '@angular/common';
import { ProjetService } from '../../shared/service/projet.service';
import { Projet } from '../../shared/model/projet';

@Component({
  selector: 'app-form-create-tache',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-create-tache.component.html',
  styleUrl: './form-create-tache.component.css'
})
export class FormCreateTacheComponent implements OnInit {

  typeTaches!: TypeTache[];
  projets!: Projet[];

  constructor(private typeTacheService:TypeTacheService, private projetService : ProjetService) {

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
