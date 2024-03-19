import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UtilisateurService } from '../../shared/service/utilisateur.service';
import { Utilisateur } from '../../shared/model/utilisateur';
import { TacheService } from '../../shared/service/tache.service';
import { Tache } from '../../shared/model/tache';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})

export class CalendrierComponent implements OnInit {

  weekNumber!: number;
  today: Date;
  currentDate: Date;
  daysInMonth: (Date | null)[];
  weekDays: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  weeks: { weekNumber: number, days: (Date | null)[] }[] = [];
  // Simulation d'un utilisateur connecté 
  idUtilisateurConnecté: number = 4;
  // J'ai dû initialiser utilisateur avec des valeurs nulle par défaut
  // pour éviter des erreurs à la compilation (le programme essayait d'accéder
  // à prenomUtilisateur alors que l'utilisateur n'est pas encore chargé)
  utilisateur: Utilisateur | any = {};
  tachesByMonth: Tache[] = [];
  dureesTachesByMonth: number[] = [];
  
  constructor(private utilisateurService: UtilisateurService, private tacheService: TacheService) {
    // Je suis obligée de créer la date du jour (qui ne se modifiera pas)
    // pour afficher le jour et le n° de semaine d'une certaine couleur
    this.today = new Date();
    this.currentDate = new Date();
    this.daysInMonth = [];
  }

  ngOnInit(): void {    
    this.getDaysInMonth();
    // Je récupère l'utilisateur connecté
    this.utilisateurService.getUtilisateurById(this.idUtilisateurConnecté).subscribe(data => {
          this.utilisateur = data});
    // Je récupère les tâches de mon utilisateur par mois
    this.loadTachesByUtilisateurByMonth();  
    this.loadDureesTachesByMonth();    
  }

  // Récupération de la liste des tâches de l'utilisateur connecté, par mois
  loadTachesByUtilisateurByMonth() {    
    this.tacheService.getTachesByUtilisateurByMonth(this.idUtilisateurConnecté, this.currentDate.getMonth(), this.currentDate.getFullYear()).subscribe(data => {
      this.tachesByMonth = data;
      console.log("tachesByMonth", this.tachesByMonth); 
    });
  }

  // Récupération de la liste des durées des tâches, de l'utilisateur connecté, par jour sur un mois
  loadDureesTachesByMonth() {
    this.tacheService.getListDureesTachesByUtilisateurByMonth(this.idUtilisateurConnecté,this.currentDate.getMonth(), this.currentDate.getFullYear() ).subscribe(data => {
      this.dureesTachesByMonth = data;
      console.log("tableau des durées du mois de ", this.currentDate.getMonth() +1 , this.dureesTachesByMonth); 
    })
  }

  // Calcule le  nombre de jours dans un mois et cale le 1er jour du mois
  // sous le bon nom de jour grâce aux espaces vides
  getDaysInMonth(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
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

  // Permet d'afficher le calendrier du mois et de charger sa liste de tâches
  goToCurrentMonth(): void {
    this.currentDate = new Date();
    this.getDaysInMonth();
    this.loadTachesByUtilisateurByMonth();
    this.loadDureesTachesByMonth(); 
  }
  
  // Permet d'afficher le calendrier du mois suivant et de charger sa liste de tâches
  goToPreviousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.getDaysInMonth();
    this.loadTachesByUtilisateurByMonth();
    this.loadDureesTachesByMonth(); 
  }

  // Permet d'afficher le calendrier du mois précédent et de charger sa liste de tâches
  goToNextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.getDaysInMonth();
    this.loadTachesByUtilisateurByMonth();
    this.loadDureesTachesByMonth(); 
  }

  // Permet de calculer le n° de semaine par rapport à une date donnée
  getWeekNumber(d: Date): number {
    // Copie de la date pour éviter de modifier l'original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Définir au dimanche le plus proche
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Date de début de l'année
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calcul de la différence de jours et division par 7 pour obtenir le numéro de semaine
    // Math.ceil permet d'arrondir au-dessus
    const weekNo = Math.ceil(( (d.getTime() - yearStart.getTime()) / 86400000 + 1)/7);
    return weekNo;
  }

  // Calcul du dimanche de Pâques par année
  paques(year: number): Date {
    const a = year % 19;
    const century = Math.floor(year / 100);
    const yearsAfterCentury = year % 100;
    const d = (19 * a + century - Math.floor(century / 4) - Math.floor((Math.floor(century - (century + 8) / 25) + 1) / 3) + 15) % 30;
    const e = (32 + 2 * (century % 4) + 2 * Math.floor(yearsAfterCentury / 4) - d - (yearsAfterCentury % 4)) % 7;
    const f = d + e - 7 * Math.floor((a + 11 * d + 22 * e) / 451) + 114;
    const month = Math.floor(f / 31);
    const day = (f % 31) + 1;
    return new Date(year, month - 1, day);
  }

  // Calcul des jours fériés par année
  getHolidays(year: number): Date[] {
    const easter = this.paques(year);
    // lundi de Pâques
    const easterMonday= new Date (easter.getFullYear(), easter.getMonth(), easter.getDate()+1)
    // Ascension
    const ascension = new Date (easter.getFullYear(), easter.getMonth(), easter.getDate()+39);
    
    const holidays: Date[] = [
     new Date(year, 0, 1), // Jour de l'An
     easterMonday,
     new Date(year, 4, 1), // Fête du travail
     new Date(year, 4, 8), // Victoire 1945
     ascension,
     new Date(year, 6, 14), // Fête Nationale
     new Date(year, 7, 15), // Assomption
     new Date(year, 10, 1), // Toussaint
     new Date(year, 10, 11), // Armistice 1918
     new Date(year, 11, 25), // Noël
    ]
    return holidays;
  }

  // Méthode qui vérifie si un jour est férié
  isHolidays(date: Date) : boolean {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const holidays = this.getHolidays(year);
    // some() va itérer sur tous les éléments de holidays et appliquer 
    // la fonction fléchée fournie à chaque élément (holiday)
    return holidays.some(holiday =>
      holiday.getFullYear() === year &&
      holiday.getMonth() === month &&
      holiday.getDate() === day);
  }

   // // Calcule la durée des tâches dans une journée donnée
  // getDureeTachesByDay(date: Date): number {
  //   let dureeTachesByDay = 0;
  //   this.tachesByMonth.forEach(tache => {
  //     // tache.dateTache n'étant pas considéré comme une Date
  //     // j'ai dû créer une date à partir de tache.dateTache pour pouvoir utiliser 
  //     // les getters de la classe Date
  //     const tacheDate = new Date(tache.dateTache);
  //     if (tacheDate.getFullYear() === date.getFullYear() && tacheDate.getMonth() === date.getMonth() && tacheDate.getDate() === date.getDate()) {
  //       dureeTachesByDay += tache.dureeTache;
  //       console.log("le "+date.getDate(), "correspond à ", dureeTachesByDay, "h");
  //     } 
  //   });
  //   return dureeTachesByDay;
  // }
}
