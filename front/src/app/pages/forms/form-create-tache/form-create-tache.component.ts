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
      'dureeTache': new FormControl('', [Validators.required, Validators.max(9)]),
      'commentaires': new FormControl('', Validators.required)
    });
  }

  // Filtre pour ne pas pouvoir créer de tâche le samedi et le dimanche
  myFilter = (d: Date | null): boolean => {
    // j'extrais le jour de la date fournie
    const day = (d || new Date()).getDay();
    // Si le jour fourni n'est ni un dimanche, ni un samedi
    // je renvoie true (donc sélectionnable)
    return day !== 0 && day !== 6;
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
  
    // Appeler mon service pour envoyer tache à mon backend/API
      this.tacheService.createTache(tache).subscribe({
        next:(response) => {
          alert (response.message); // message de confirmation
          // Après le message, j'affiche la page liste des tâches de la semaine
          // qui correspond à la date de la tâche créée
          const date = new Date(tache.dateTache);
          const numberWeek = this.getWeekNumber(date);
          this.router.navigate(['/listTaches', numberWeek]);
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
}
