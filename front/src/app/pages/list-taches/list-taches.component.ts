import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/service/tache.service';
import { Tache } from '../../shared/model/tache';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

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

  currentDate!: Date;
  currentYear!: number;
  weekNumber!: number;
  id!: number ;
  selectedWeek!: {week:number, year:number};
  weeks: { week: number, year: number }[] = [] ;
  tachesByWeek!: Tache[];
  
  // Simulation d'un utilisateur connecté 
  idUtilisateurConnecté: number = 4;

  constructor(private tacheService:TacheService, private route: ActivatedRoute) {
    this.currentDate = new Date();
    this.weekNumber = this.getWeekNumber(this.currentDate);
    this.currentYear = this.currentDate.getFullYear();
    this.selectedWeek = { week: this.weekNumber, year: this.currentYear };
  }

  ngOnInit(): void {
    
    // Récupération du paramètre qui suit /listTaches (cf app.routes.ts)
    // pour afficher la liste de la semaine sélectionnée au niveau du calendrier
    this.route.params.subscribe(params => {
      this.weekNumber = +params['weekNumber'];
    })
    // Lorsque j'accède à la page Liste des tâches, j'affiche le n° de 
    // semaine de la date du jour
    this.initWeeks(this.weekNumber, this.currentYear);
    // Puis je charge les tâches de la semaine sélectionnée
    this.loadTachesByWeek(this.selectedWeek);
  }

  loadTachesByWeek(selectedWeek: { week: number, year: number }) {
    this.tacheService.getTachesByUtilisateurByWeek(this.idUtilisateurConnecté, selectedWeek.week, selectedWeek.year).subscribe(data => {
      this.tachesByWeek = data;
      this.initWeeks(selectedWeek.week, selectedWeek.year);
      console.log("tachesByWeek", this.tachesByWeek);  });
      console.log("weekNumber", this.selectedWeek.week);
  }

  // Méthode pour obtenir le n° de semaine de la tâche à supprimer puis la supprimer
  onDeleteTache(id: number) {
    // Je cherche la tâche associée à mon id
    this.tacheService.getTacheById(id).subscribe(tache => {
      const date = new Date(tache.dateTache);
      const weekNumber = this.getWeekNumber(date);
      // Une fois le numéro de semaine récupéré, je supprime ma tâche
      // et j'affiche la liste des tâches de la semaine qui correspond à 
      // la tâche supprimée
      this.tacheService.deleteTache(id).subscribe({
        next:(response) => {
          alert (response.message);
          // Après le message, je charge ma liste (sans la tâche supprimée)
          this.loadTachesByWeek({week:weekNumber, year: date.getFullYear()}); 
          // this.router.navigate(['/listTaches', weekNumber]);
          // this.router ne fonctionne pas car si j'ai le même n° de semaine
          // la page ne se recharge pas
        }, 
        error:(error) => {
          console.error('Erreur lors de la suppression de la tâche', error);
        }     
      });
    });
}

  onDuplicateTache(id:number, tache:Tache) {
    this.tacheService.duplicateTache(id, tache).subscribe({
      next:(response) => {
        alert(response.message);
        const date = new Date(tache.dateTache);
        if (date.getDay() === 6 || date.getDay() === 5 || date.getDay() === 0 ) {
          const weekNumber = this.getWeekNumber(date)+1; 
          this.loadTachesByWeek({week:weekNumber, year: date.getFullYear()}); 
        } else {
            const weekNumber = this.getWeekNumber(date);
            this.loadTachesByWeek({week:weekNumber, year: date.getFullYear()});
        }        
      }, 
      error:(error) => {
        console.error('Erreur lors de la duplication de la tâche', error);
      }     
    });
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

  // Méthode qui permet de filtrer par semaine 
  // en partant de la semaine actuelle
  initWeeks(weekNumber: number, currentYear: number) {    
    this.selectedWeek = { week: weekNumber, year: currentYear };
    // De la semaine actuelle à 1
    for (let i = weekNumber; i >= 1; i--) {
      this.weeks.push({week: i, year:currentYear});
    }

    for (let i = 53; i > weekNumber; i--) {
      this.weeks.push({week: i, year: currentYear - 1 });
    }
  }

  compareFn(t1: { week: number, year: number }, t2: { week: number, year: number }): boolean {
    return t1 && t2 ? t1.week === t2.week && t1.year === t2.year : t1 === t2;
}


  // // Chargement de la liste des tâches par utilisateur et semaine
  // loadTachesByWeek2(weekNumber: number) {
  //   // Je récupère la liste des tâches de l'utilisateur connecté
  //   this.tacheService.getTachesByUtilisateur(this.idUtilisateurConnecté).subscribe(data => {
  //     this.taches = data;
  //       // filter() est une méthode qui crée un nouveau tableau
  //       // avec tous les éléments qui passent le test implémenté par 
  //       // la fonction fournie : vérifier si la tâche courante 
  //       // appartient à la semaine donnée par weekNumber
  //       this.filteredTaches = this.taches.filter(tache => {
  //         // j'extrais la date pour obtenir le numéro de semaine de la tache
  //         const date = new Date(tache.dateTache);
  //         const numberWeek = this.getWeekNumber(date);
  //         // si les deux n° correspondent alors la tâche appartient
  //         // à la semaine donnée et est incluse dans le tableau filteredTaches
  //           return numberWeek === weekNumber;
  //       });
  //   })
  //   // Une fois que j'ai chargé la liste des tâches, je mets le n° de semaine
  //   // dans le filtre
  //   this.initWeeks(weekNumber);
  // }
}
