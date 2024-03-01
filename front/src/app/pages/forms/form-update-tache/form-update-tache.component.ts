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
          // Après le message, j'affiche la page liste des tâches
          this.router.navigate(['/listTaches']);
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

}
