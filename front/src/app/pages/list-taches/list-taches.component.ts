import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/service/tache.service';
import { Tache } from '../../shared/model/tache';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-taches',
  standalone: true,
  // Import de CommonModule pour utiliser la directive *ngFor dans le html
  imports: [CommonModule, RouterLink],
  templateUrl: './list-taches.component.html',
  styleUrl: './list-taches.component.css'
})
export class ListTachesComponent implements OnInit {
  taches!: Tache[];

  constructor(private tacheService:TacheService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.tacheService.getTaches().subscribe(data => {
      this.taches = data;
    })
  }

  // Chargement de la liste des tâches
  loadListTaches() {
    this.tacheService.getTaches().subscribe(data => {
      this.taches = data;
    })
  }

  onDeleteTache(id:number) {
    this.tacheService.deleteTache(id).subscribe({
      next:(response) => {
        alert (response.message);
        // Après le message, j'actualise ma page (sans la tâche supprimée)
        this.loadListTaches();
        // Le code ci-dessous n'actualise pas la page 
        //this.router.navigate(['/listTaches']);
      }, 
      error:(error) => {
        console.error('Erreur lors de la suppression de la tâche', error);
      }     
    });
  }

  onDuplicateTache(id:number) {
    this.tacheService.duplicateTache(id).subscribe({
      next:(response) => {
        alert(response.message);
        // Après le message, j'actualise ma page (avec la tâche dupliquée)
        this.loadListTaches();
      }, 
      error:(error) => {
        console.error('Erreur lors de la duplication de la tâche', error);
      }     
    });
  }
}
