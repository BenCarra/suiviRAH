import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { TypeTacheService } from '../../../shared/service/type-tache.service';
import { ProjetService } from '../../../shared/service/projet.service';
import { TacheService } from '../../../shared/service/tache.service';
import { TypeTache } from '../../../shared/model/type-tache';
import { Projet } from '../../../shared/model/projet';
import { Tache } from '../../../shared/model/tache';

@Component({
  selector: 'app-form-update-tache',
  standalone: true,
  imports: [CommonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-update-tache.component.html',
  styleUrl: './form-update-tache.component.css'
})
export class FormUpdateTacheComponent implements OnInit {

  weekNumber!: number;
  idTacheSelectionnee!: number;
  submitted: boolean = false;
  formUpdateTache: FormGroup;
  typeTaches!: TypeTache[];
  projets!: Projet[];

  // Simuler l'utilisateur connecté en hardcodant l'id d'utilisateur
  idUtilisateurConnecté: number = 4;
  
  constructor(private typeTacheService:TypeTacheService,
    private projetService : ProjetService,
    private tacheService : TacheService,
    private route:ActivatedRoute,
    private router: Router) {

    // Création d'un objet FormGroup
    this.formUpdateTache=new FormGroup({
      'nomTache': new FormControl('', Validators.required),
      'libelleTypeTache': new FormControl('', Validators.required),
      'nomProjet': new FormControl('', Validators.required),
      'dateTache': new FormControl('', Validators.required),
      'journee': new FormControl(false),
      'dureeTache': new FormControl('', Validators.required),
      'commentaires': new FormControl('', Validators.required)
    });
  }

   // Filtre pour ne pas pouvoir créer de tâche le samedi et le dimanche
   myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  
  ngOnInit(): void {

    // Récupération de l'id de la tâche que je veux modifier
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.idTacheSelectionnee = id;
        // Appel de loadTacheDetails pour afficher les
        // détails de la tâche sélectionnée
        this.loadTacheDetails(id);
      }
    });

      this.typeTacheService.getTypeTaches().subscribe(data => {
        this.typeTaches = data;
      })
  
      this.projetService.getProjetsByUtilisateur(this.idUtilisateurConnecté).subscribe(data => {
        this.projets = data;
      })
  
      this.setupFormChanges();    
  
  }

  loadTacheDetails(idTache:number) {
    this.tacheService.getTacheById(idTache).subscribe(tache => {
      this.formUpdateTache.patchValue({
        nomTache: tache.nomTache,
        libelleTypeTache: tache.libelleTypeTache,
        nomProjet: tache.nomProjet,
        dateTache: tache.dateTache,
        dureeTache: tache.dureeTache,
        commentaires: tache.commentaires
      });
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.formUpdateTache.valid) {
      const tacheAModifier: Tache = this.formUpdateTache.value;
      // Attribution de l'id de la tâche sélectionnée 
      // à la tâche à modifier 
      tacheAModifier.idTache = this.idTacheSelectionnee;

       // Si la checkbox 'journee' est cochée, définir 'dureeTache' à 7
      if (this.formUpdateTache.value.journee) {
        tacheAModifier.dureeTache = 7;
      }

      this.tacheService.updateTache(this.idTacheSelectionnee, tacheAModifier).subscribe({       
        next:(response) => {
          alert (response.message);
          // Après le message, j'affiche la page liste des tâches de la semaine
          // qui correspond à la date de la tâche modifiée
          const date = new Date(tacheAModifier.dateTache);
          const numberWeek = this.getWeekNumber(date);
          // Comme je suis dans la méthode onSubmit() la page va se recharger
          // lorsque je cliquerai sur Valider 
          this.router.navigate(['/listTaches', numberWeek]);
        }, 
        error:(error) => {
          console.error('Erreur lors de la modification de la tâche', error);
        }     
      });

    } else {
      console.log("Tous les champs doivent être renseignés");
    }   
  }

  setupFormChanges() {
    this.formUpdateTache.get('journee')?.valueChanges.subscribe((checked:boolean) => {
      if (checked) {
        this.formUpdateTache.get('dureeTache')?.setValue(7);
        this.formUpdateTache.get('dureeTache')?.disable();
      } else {
        this.formUpdateTache.get('dureeTache')?.setValue('');
        this.formUpdateTache.get('dureeTache')?.enable();
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
