import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../shared/service/tache.service';
import { TypeTache } from '../../shared/model/type-tache';
import { TypeTacheService } from '../../shared/service/type-tache.service';
import { CommonModule } from '@angular/common';
import { ProjetService } from '../../shared/service/projet.service';
import { Projet } from '../../shared/model/projet';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private typeTacheService:TypeTacheService,
    private projetService : ProjetService,
    private tacheService : TacheService) {

    // Création d'un objet FormGroup
    this.formCreateTache=new FormGroup({
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
    this.typeTacheService.findAll().subscribe(data => {
      this.typeTaches = data;
    })

    this.projetService.findAll().subscribe(data => {
      this.projets = data;
    })

    this.setupFormChanges();
  }

  onSubmit() {

    this.submitted = true;

    if (this.formCreateTache.valid) {

    // Simuler l'utilisateur connecté en hardcodant le nom d'utilisateur
    const nomUtilisateurSimule = "OLA"; 

    // Construire l'objet tache en ajoutant le nom d'utilisateur simulé
    const tache = {
      ...this.formCreateTache.value,
      listNomsUtilisateurs: [nomUtilisateurSimule] // Ajoute le nom d'utilisateur simulé dans le tableau
    };

    // Si la checkbox 'journee' est cochée, définir 'dureeTache' à 7
    if (tache.journee) {
      tache.dureeTache = 7;
    }
  
    // Appeler mon service pour envoyer tache à mon backend/API
      this.tacheService.createTache(tache).subscribe({
        next:(response) => console.log('Tâche créée avec succès', response),
        error: (error) => console.error('Erreur', error)
      });
    } else {
      console.log("Tous les champs doivent être renseignés")
    }

    // const formData = this.formCreateTache.value;
    // console.log(formData);

    // if (this.formCreateTache.valid) {
    //   const tache: Tache = this.formCreateTache.value;
    //   this.tacheService.createTache(tache).subscribe({
    //     next:(response) => console.log('Tâche créée avec succès', response),
    //     error: (error) => console.error('Erreur', error)
    //   });
    // }
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
}
