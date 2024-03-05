import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { UtilisateurService } from '../../shared/service/utilisateur.service';
import { Utilisateur } from '../../shared/model/utilisateur';

// import { CalendarModule } from 'angular-calendar';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [ CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})
export class CalendrierComponent implements OnInit {

  // // J'ai du initialiser utilisateur avec des valeurs nulle par défaut
  // // pour éviter des erreurs à la compilation (le programme essayait d'accéder
  // // à prenomUtilisateur alors que l'utilisateur n'était pas encore chargé)
  // utilisateur: Utilisateur | any = {};

  // // Simulation d'un utilisateur connecté 
  // idUtilisateurConnecté: number = 4;
 
  // currentMonth!: Date;
  // // days: Date[] = [];
  // // firstDay!: Date;
  // // lastDay!: Date;

  // constructor(private utilisateurService:UtilisateurService) {

  // }

  // ngOnInit(): void {
  //   this.currentMonth = new Date();
  //   // this.generateCalendar(this.currentMonth);
  //   this.utilisateurService.getUtilisateurById(this.idUtilisateurConnecté).subscribe(data => {
  //     this.utilisateur = data});
      
  //   }  
  

  // generateCalendar(month: Date) {
  //   // this.days =[];

  //   // const first = new Date(month.getFullYear(), month.getMonth(), 1);
  //   // this.firstDay = first;

  //   // // Le dernier 0 correspond au dernier jour avant le 1er jour du mois suivant
  //   // // donc le dernier du mois précédent
  //   // const last =  new Date(month.getFullYear(), month.getMonth() + 1, 0 )
  //   // this.lastDay = last;

  //   // for (let day = first; day <= last; day.setDate(day.getDate()+1)) {
  //   //   this.days.push(new Date(day));
  //   // }

  //   // // Ajustement pour commencer la semaine le dimanche
  //   // first.setDate(first.getDate() - first.getDay());

  //   // // Ajustement pour finir la semaine le samedi
  //   // last.setDate(last.getDate() + (6 - last.getDay()));
  // }

  // // Méthode qui calcule le numéro de semaine par rapport à une date donnée
  // // getWeekNumber(d: Date): number {
  // //   const oneJan = new Date(d.getFullYear(), 0, 1);
  // //   const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
  // //   const result = Math.ceil((numberOfDays + oneJan.getDay()) / 7);   
  // //   return result;
  // // }

  // // Méthode 
  // getWeeks():  void {
  // //   let weeks: Date[][] = [];
  // //   let week: Date[] = [];
  // //   this.days.forEach((day, index) => {
  // //     if (index % 7 === 0 && week.length > 0) {
  // //       weeks.push(week);
  // //       week = [];
  // //     }
  // //     week.push(day);
  // //     if (index === this.days.length - 1) {
  // //       weeks.push(week);
  // //     }
  // //   });
  // //   return weeks;
  // }

  currentMonth: Date;
  daysInMonth: (Date | null)[];;
  weekDays: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor() {
    this.currentMonth = new Date();
    this.daysInMonth = [];
  }

  ngOnInit(): void {
    this.calculateDaysInMonth();
  }

  calculateDaysInMonth(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Déterminer le jour de la semaine du premier jour du mois
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Adapter pour que le calendrier commence par Lundi (0 pour Dimanche, 6 pour Samedi)
    const blankDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
    this.daysInMonth = [];
    
    // Ajouter des espaces vides pour les jours avant le début du mois
    for (let i = 0; i < blankDays; i++) {
      this.daysInMonth.push(null); // null représente un espace vide
    }
  
    // Remplir avec les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
  }
  

  goToPreviousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.calculateDaysInMonth();
  }

  goToNextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.calculateDaysInMonth();
  }
}
