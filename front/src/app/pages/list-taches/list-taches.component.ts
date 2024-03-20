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
  selectedWeek: {week:number, year:number};
  selectedWeekStartEnd: { start: Date, end: Date } | undefined;
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
      this.currentYear = this.currentDate.getFullYear();
       // Après avoir récupéré le paramètre weekNumber, je mets à jour le filtre par semaine
       // avec le n° de semaine et l'année (pour afficher la bonne semaine après une création
       // et une modification de tâche)
      this.selectedWeek = { week: this.weekNumber, year: this.currentYear };
      // Lorsque j'accède à la page Liste des tâches, j'affiche le n° de 
      // semaine de la date du jour
      this.initWeeks(this.weekNumber, this.currentYear);
      // Puis je charge les tâches de la semaine sélectionnée
      this.loadTachesByWeek({ week: this.weekNumber, year: this.currentYear });
    })
   
    console.log(this.weeks);
  }

  loadTachesByWeek(selectedWeek: { week: number, year: number }) {
    // Calculer et mettre à jour les dates de début et de fin
  this.selectedWeekStartEnd = this.getWeekStartAndEndDate(selectedWeek.week, selectedWeek.year);

    this.tacheService.getTachesByUtilisateurByWeek(this.idUtilisateurConnecté, selectedWeek.week, selectedWeek.year).subscribe(data => {
      this.tachesByWeek = data;      

      console.log("tachesByWeek", this.tachesByWeek);
      console.log("weekNumber", this.selectedWeek.week);
      });

      
  }

   // Méthode qui permet de filtrer par semaine 
  // en partant de la semaine actuelle
  initWeeks(weekNumber: number, currentYear: number) {    
    this.weeks = []; // je vide le tableau avant de le remplir
    // Je récupère le lundi de la semaine correspondant au numéro de semaine et à l'année
    let startDate = this.getDateFromWeekNumber(weekNumber, currentYear);   
    for (let i = 1; i <= 53 ; i++) {
      const numberWeek = this.getWeekNumber(startDate);   
      // je commence par ajouter à mon tableau le n° de semaine et l'année
      // de la date correspondant au n° de semaine sélectionnée   
      this.weeks.push({week: numberWeek, year:currentYear});
      // Puis je soustrais 7 jours à ma date 
      // (ce qui correspondra au n° de semaine précédent)
      startDate.setDate(startDate.getDate() - 7);
      }
      // Si le weekNumber est identique en 1ère et dernière position
      // (qui correspond donc à l'année précédente), alors je ne le mets pas
      // Cela voudra dire que l'année précédente contenait 52 semaines
      if (this.weeks[0].week == this.weeks[this.weeks.length-1].week) {
        // je supprime le dernier élément ajouté (à la dernière itération)
        this.weeks.pop();
       }
  }
  getDateFromWeekNumber(weekNumber: number, year: number): Date {
    // Crée une date 'simple' qui est théoriquement le premier jour de la semaine donnée.
    // Le calcul commence par le premier janvier de l'année donnée ('year', 0, 1)
    // puis ajoute un nombre de jours équivalent à 7 jours multiplié par le nombre de semaines moins une
    // (car la semaine 1 ne doit pas ajouter de jour supplémentaire).
    let simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  
    // Obtenir le jour de la semaine pour cette date 'simple'. 
    // .getDay() renvoie un nombre de 0 (dimanche) à 6 (samedi).
    let dow = simple.getDay();
  
    // Prépare la variable 'ISOweekStart' qui déterminera le véritable début de la semaine ISO.
    let ISOweekStart = simple;
  
    // Si le jour de la semaine est inférieur ou égal à 4 (jeudi), on ajuste 'ISOweekStart'
    // pour qu'elle pointe vers le lundi de la semaine courante. 
    // Cela est fait en soustrayant le nombre de jours écoulés depuis le lundi (simple.getDay() - 1).
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      // Si le jour de la semaine est après jeudi, cela signifie que le calcul initial 
      // a pointé vers la semaine suivante selon la norme ISO 8601. 
      // On doit donc ajuster 'ISOweekStart' pour revenir au lundi de la semaine précédente. 
      // Cela est fait en ajoutant des jours pour revenir au lundi suivant (8 - simple.getDay()).
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  
    // Retourne la date corrigée pour refléter le début de la semaine ISO (lundi) pour la semaine donnée.
    return ISOweekStart;
  }

  getWeekStartAndEndDate(weekNumber: number, year: number): { start: Date, end: Date } {
    let startDate = this.getDateFromWeekNumber(weekNumber, year);
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Ajouter 6 jours pour avoir la fin de la semaine
    return { start: startDate, end: endDate };
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
   
  // initWeeks(weekNumber: number, currentYear: number)  {
  //   this.listWeeks = []; // Réinitialiser la liste vide
  //   let startDate = this.getDateFromWeekNumber(weekNumber, currentYear);
    
  //   for (let i = 1; i <= 53 ; i++) {
  //     const numberWeek = this.getWeekNumber(startDate);
  //     this.listWeeks.push(numberWeek);
  //     startDate.setDate(startDate.getDate() - 7);
  //   }

  //   if (this.listWeeks[this.listWeeks.length-1] == this.listWeeks[0]) {
  //     this.listWeeks.pop();
  //   }
  // }


  // Cette méthode permet d'afficher le numéro de la semaine sélectionnée 
  // dans le filtre par semaine
  compareWeekNumber(t1: { week: number, year: number }, t2: { week: number, year: number }): boolean {
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
