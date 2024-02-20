import { Component, OnInit } from '@angular/core';
import { Projet } from '../../model/projet';
import { ProjetService } from '../../service/projet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-projets',
  standalone: true,
  // Import de CommonModule pour utiliser la directive *ngFor dans le html
  imports: [CommonModule],
  templateUrl: './list-projets.component.html',
  styleUrl: './list-projets.component.css'
})
export class ListProjetsComponent implements OnInit{
 
  projets!: Projet[];

  constructor(private projetService: ProjetService) {

  }

  ngOnInit(): void {
    this.projetService.findAll().subscribe(data => {
      this.projets = data;
    });
  }

}
