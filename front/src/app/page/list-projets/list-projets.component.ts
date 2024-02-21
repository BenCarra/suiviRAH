import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Projet } from '../../shared/model/projet';
import { ProjetService } from '../../shared/service/projet.service';

@Component({
  selector: 'app-list-projets',
  standalone: true,
  // Import de CommonModule pour utiliser la directive *ngFor dans le html
  imports: [CommonModule],
  templateUrl: './list-projets.component.html',
  styleUrl: './list-projets.component.css'
})
export class ListProjetsComponent {

  projets!: Projet[];

  constructor(private projetService: ProjetService) {

  }

  ngOnInit(): void {
    this.projetService.findAll().subscribe(data => {
      this.projets = data;
    });
  }

}
