import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TacheService } from '../../../shared/service/tache.service';
import { TypeTache } from '../../../shared/model/type-tache';
import { TypeTacheService } from '../../../shared/service/type-tache.service';
import { ProjetService } from '../../../shared/service/projet.service';
import { Projet } from '../../../shared/model/projet';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-tache',
  standalone: true,
  imports: [CommonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatDatepickerModule,
    ReactiveFormsModule ],
  templateUrl: './form-create-tache.component.html',
  styleUrl: './form-create-tache.component.css'
})

export class FormCreateTacheComponent implements OnInit {

  submitted: boolean = false;
  formCreateTache: FormGroup;
  typeTaches!: TypeTache[];
  projets!: Projet[];

  // Simuler l'utilisateur connecté en hardcodant l'id d'utilisateur
  idUtilisateurConnecté: number = 4;

  constructor(private typeTacheService:TypeTacheService,
    private projetService : ProjetService,
    private tacheService : TacheService,
    private router: Router) {

    // Création d'un objet FormGroup
    this.formCreateTache=new FormGroup({
      'nomTache': new FormControl('', Validators.required),
      'libelleTypeTache': new FormControl('', Validators.required),
      'nomProjet': new FormControl('', Validators.required),
      'dateTache': new FormControl('', Validators.required),
      'journee': new FormControl(false),
      //  Validators.max(9) empêche à l'utilisateur de mettre une valeur au dessus de 9
      'mco' : new FormControl(false),
      'nouvelleDemande': new FormControl(false),
      'dureeTache': new FormControl('', [Validators.required, Validators.max(9)]),
      'commentaires': new FormControl('', Validators.required)
    });
  }

  // Filtre pour ne pas pouvoir créer de tâche le samedi,
  // le dimanche et les jours fériés
  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    // j'extrais le jour de la date fournie
    const day = date.getDay();
    // Si le jour fourni n'est ni un dimanche, ni un samedi,
    // ni un jour ferié, je renvoie true (donc sélectionnable)
    return day !== 0 && day !== 6 && !this.isHolidays(date);
  };

  ngOnInit(): void {
    this.typeTacheService.getTypeTaches().subscribe(data => {
      this.typeTaches = data;
    })

    this.projetService.getProjetsByUtilisateur(this.idUtilisateurConnecté).subscribe(data => {
      this.projets = data;
    })

    this.setupFormChanges();
  }

  onSubmit() {

    this.submitted = true;

    if (this.formCreateTache.valid) {

    // Construire l'objet tache en ajoutant le nom d'utilisateur simulé
    const tache = {
      ...this.formCreateTache.value,
      listIdUtilisateurs: [this.idUtilisateurConnecté] // Ajoute l'id d'utilisateur connecté dans le tableau
    };

    // Si la checkbox 'journee' est cochée, définir 'dureeTache' à 7
    if (tache.journee) {
      tache.dureeTache = 7;
    }

    if (tache.mco) {
      tache.mco = true;
      console.log("valeur de mco : ", tache.mco);
    }

    if (tache.nouvelleDemande) {
      tache.mco = true;
    }
  
    // Appeler mon service pour envoyer tache à mon backend/API
      this.tacheService.createTache(tache).subscribe({
        next:(response) => {
          alert (response.message); // message de confirmation
          // Après le message, j'affiche la page liste des tâches de la semaine
          // qui correspond à la date de la tâche créée
          const date = new Date(tache.dateTache);
          const weekNumber = this.getWeekNumber(date);
          this.router.navigate(['/listTaches', weekNumber]);
        }, 
        error:(error) => {
          console.error('Erreur lors de la création de la tâche', error);
        }     
      });
    } else {
      console.log("Tous les champs doivent être renseignés")
    }
  }

  setupFormChanges() {
    this.formCreateTache.get('journee')?.valueChanges.subscribe((checked:boolean) => {
      if (checked) {
        this.formCreateTache.get('dureeTache')?.setValue(7);
        this.formCreateTache.get('dureeTache')?.disable();
      } else {
        this.formCreateTache.get('dureeTache')?.setValue('');
        this.formCreateTache.get('dureeTache')?.enable();
      }
    })
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

  // Les méthodes ci-dessous nous permettrons de ne pas pouvoir créer de tâche les jours fériés
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
}
