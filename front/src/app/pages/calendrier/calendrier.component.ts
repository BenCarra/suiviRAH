import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurService } from '../../shared/service/utilisateur.service';
import { Utilisateur } from '../../shared/model/utilisateur';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})
export class CalendrierComponent implements OnInit {

  currentMonth: Date;
  daysInMonth: (Date | null)[];
  weekDays: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  weeks: { weekNumber: number, days: (Date | null)[] }[] = [];

  // Simulation d'un utilisateur connecté 
  idUtilisateurConnecté: number = 4;

  // J'ai du initialiser utilisateur avec des valeurs nulle par défaut
  // pour éviter des erreurs à la compilation (le programme essayait d'accéder
  // à prenomUtilisateur alors que l'utilisateur n'était pas encore chargé)
  utilisateur: Utilisateur | any = {};

  constructor(private utilisateurService: UtilisateurService) {
    this.currentMonth = new Date();
    this.daysInMonth = [];
  }

  ngOnInit(): void {
    this.calculateDaysInMonth();
    // Le code ci-dessous permet d'afficher l'utilisateur connecté
    this.utilisateurService.getUtilisateurById(this.idUtilisateurConnecté).subscribe(data => {
           this.utilisateur = data});
  }

  // Calcule le  nombre de jours dans un mois et cale le 1er jour du mois
  // sous le bon nom de jour grâce aux espaces vides
  calculateDaysInMonth(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    // daysInMonth renvoie le 0ème jour du mois + 1, ie le dernier
    // jour du mois (et donc le nombre de jours !)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Détermine le jour de la semaine du premier jour du mois
    // 0: dimanche, 1: lundi, 2: mardi, 3: mercredi, 4: jeudi,
    // 5: vendredi, 6: samedi
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Le 1er jour du calendrier correspond à un lundi
    // Si le 1er jour du mois est un dimanche:0 on aura besoin de 6 jours blancs
    // Si le 1er jour n'est pas un dimanche, on aura fistDayOfMonth -1 jours blancs
    const blankDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
    // condition ? valeurSiVraie : valeurSiFausse;

    // Je vide mon tableau avant de le remplir afin de ne pas avoir 
    // les jours des mois précédents
    this.daysInMonth = []; 

    // Tableau pour stocker les n° de semaine
    let weeksTemp: any[] = []
    
    // J'ajoute d'abord des espaces vides pour caler le 1er jour
    // sous son bon nom de jour 
    for (let i = 0; i < blankDays; i++) {
      this.daysInMonth.push(null); // null représente un espace vide
    }
  
    // Puis je remplis avec les jours du mois 
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }

    // Tableau temporaire qui représente une semaine
    // Comme day (dans la boucle) peut être nul je dois rajouter | null
    let week: (Date | null)[] = [];

    // Je parcours tous les jours du mois
    // Pour chaque jour j'exécute une fonction qui prend
    // le jour actuel et son index
    this.daysInMonth.forEach((day, index) => {
      // Je remplis la semaine avec la date 
      week.push(day);
      // Je vérifie si la semaine est complète (index+1)mod7=0
      // ou si c'est de dernier élément du mois
      if ((index + 1) % 7 === 0 || index === this.daysInMonth.length - 1) {
      // j'ajoute alors au tableau des semaines, la semaine et ses dates associées
        weeksTemp.push({
          // si le week[0] est null alors il prend le 1er jour du mois
          weekNumber: this.getWeekNumber(week[0] || new Date(year, month, 1)),
          days: week
        });
        week = []; // Je vide la semaine pour créer la prochaine      
      }
    });
    this.weeks = weeksTemp; // Je stocke mes semaines dans weeks
  }
  
  goToPreviousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.calculateDaysInMonth();
  }

  goToNextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.calculateDaysInMonth();
  }

   
  getWeekNumber(d: Date): number {
    // Copie de la date pour éviter de modifier l'original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Définir au dimanche le plus proche
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Date de début de l'année
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calcul de la différence de jours et division par 7 pour obtenir le numéro de semaine
    // Math.ceil permet d'arrondir au dessus
    const weekNo = Math.ceil(( (d.getTime() - yearStart.getTime()) / 86400000 + 1)/7);
    return weekNo;
  }

}
