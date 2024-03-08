import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/service/tache.service';
import { Tache } from '../../shared/model/tache';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-taches',
  standalone: true,
  // Import de CommonModule pour utiliser la directive *ngFor dans le html
  imports: [CommonModule, 
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule],
  templateUrl: './list-taches.component.html',
  styleUrl: './list-taches.component.css'
})
export class ListTachesComponent implements OnInit {

  weekNumber: number = 1;
  id: number = 1 ;
  selectedWeek!: number;
  filteredTaches!: Tache[];
  weeks: number[] =[]; // tableau contenant les numéros de semaine
  taches!: Tache[];
  tache!: Tache;
  

  // Simulation d'un utilisateur connecté 
  idUtilisateurConnecté: number = 4;

  constructor(private tacheService:TacheService, private route: ActivatedRoute ) {
  }
  ngOnInit(): void {

    this.initWeeks();

    this.route.params.subscribe(params => {
      this.weekNumber = +params['weekNumber'];
      this.loadListTachesByWeek2(this.weekNumber);
    })
    

    // this.tacheService.getTachesByUtilisateur(this.idUtilisateurConnecté).subscribe(data => {
    //   this.taches = data;

    //   this.updateTachesForWeek();

    //   // initialisation de la liste complète des tâches 
    //   // avant de sélectionner une semaine
    //   // this.filteredTaches = [...this.taches];
    // })
  }

  // // Chargement de la liste complète des tâches
  // loadListTaches() {
  //   this.tacheService.getTaches().subscribe(data => {
  //     this.taches = data;
  //   })
  // }

   // Chargement de la liste des tâches par utilisateur et semaine
  // loadListTachesByWeek() {
  //   this.tacheService.getTachesByUtilisateur(this.idUtilisateurConnecté).subscribe(data => {
  //     this.taches = data;
  //     this.updateTachesForWeek();
  //   })
  // }

  loadListTachesByWeek2(weekNumber: number) {
    this.tacheService.getTachesByUtilisateur(this.idUtilisateurConnecté).subscribe(data => {
      this.taches = data;
      this.updateTachesForWeek2(weekNumber);
    })
  }

 // Méthode hypothétique pour obtenir les détails de la tâche et ensuite la supprimer
  getDetailsAndDeleteTache(id: number) {
    this.tacheService.getTacheById(id).subscribe(tache => {
      const date = new Date(tache.dateTache);
      const weekNumber = this.getWeekNumber(date);
      this.onDeleteTache(id, weekNumber); 
    });
}


   onDeleteTache(id:number, weekNumber: number) {  
    this.tacheService.deleteTache(id).subscribe({
      next:(response) => {
        alert (response.message);
        // Après le message, j'actualise ma page (sans la tâche supprimée)
        this.loadListTachesByWeek2(weekNumber);
        
  
      }, 
      error:(error) => {
        console.error('Erreur lors de la suppression de la tâche', error);
      }     
    });
  }

  onDuplicateTache(id:number, tache:Tache) {
    this.tacheService.duplicateTache(id, tache).subscribe({
      next:(response) => {
        alert(response.message);
        // Après le message, j'actualise ma page (avec la tâche dupliquée)
        
        const date = new Date(tache.dateTache);
        const number = this.getWeekNumber(date);
        this.loadListTachesByWeek2(number);
      }, 
      error:(error) => {
        console.error('Erreur lors de la duplication de la tâche', error);
      }     
    });
  }

  // Méthode qui liste les tâches d'une semaine donnée 
  // updateTachesForWeek(): void {
  //   if (this.selectedWeek === null) {
  //     this.filteredTaches = this.taches;
  //   } else {
  //     this.filteredTaches = this.taches.filter(tache => {
  //       const date = new Date(tache.dateTache);
  //       const weekNumber = this.getWeekNumber(date);
  //       return weekNumber === this.selectedWeek;
  //     });
  //   }
  // }

  updateTachesForWeek2(weekNumber: number): void {  
    if (this.selectedWeek === null) {
          this.filteredTaches = this.taches;
        } else {
      this.filteredTaches = this.taches.filter(tache => {
        const date = new Date(tache.dateTache);
        const number = this.getWeekNumber(date);
        return number === weekNumber;
      });
    }

  }
  
  // Méthode qui calcule le numéro de semaine par rapport à une date donnée  
  getWeekNumber(d: Date): number {
    // Copie de la date pour éviter de modifier l'original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Définir au dimanche le plus proche
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Date de début de l'année
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calcul de la différence de jours et division par 7 pour obtenir le numéro de semaine
    const weekNo = Math.ceil(( (d.getTime() - yearStart.getTime()) / 86400000 + 1)/7);
    return weekNo;
  }

  // Méthode qui permet de filtrer par semaine en partant de la semaine dans laquelle on est
  initWeeks() {
    const today = new Date();
    const currentWeek = this.getWeekNumber(today);
    this.selectedWeek = currentWeek;

    // De la semaine actuelle à 1
    for (let i = currentWeek; i >= 1; i--) {
      this.weeks.push(i);
    }

    // De 52 à la semaine juste après la semaine actuelle
    if (currentWeek < 52) {
      for (let i = 52; i > currentWeek; i--) {
        this.weeks.push(i);
      }
    }
  }

}
