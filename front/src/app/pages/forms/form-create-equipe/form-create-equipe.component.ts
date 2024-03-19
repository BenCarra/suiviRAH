import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Equipe } from '../../../shared/model/equipe';
import { EquipeService } from '../../../shared/service/equipe.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../shared/model/utilisateur';
import { UtilisateurService } from '../../../shared/service/utilisateur.service';

@Component({
  selector: 'app-form-create-equipe',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-create-equipe.component.html',
  styleUrl: './form-create-equipe.component.css'
})
export class FormCreateEquipeComponent {

  formCreate!: FormGroup;
  equipeCreee: Equipe = new Equipe();
  utilisateurs!: Utilisateur[];

  constructor(private equipeService: EquipeService, private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      libelle: new FormControl('', Validators.required),
      utilisateurs: new FormControl('', Validators.required)
    })

    // Récupération des utilisateurs pour l'affectation d'un ou plusieurs utilisateurs à une équipe
    this.utilisateurService.findAll().subscribe(
      data => {
        this.utilisateurs = [];
        data.forEach( utilisateur => {
          if (utilisateur.actif) {
            this.utilisateurs.push(utilisateur);
          }
        })
      }
    )

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/equipes");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['libelle'].hasError('required') ||
    this.formCreate.controls['utilisateurs'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.equipeCreee.libelle = this.formCreate.get("libelle")?.value;
      this.equipeCreee.listUtilisateurs = this.formCreate.get("utilisateurs")?.value;
      this.equipeService.create(this.equipeCreee).subscribe({
        next: (response) => {
          alert('Equipe ' + response.libelle + ' créée!');
          this.router.navigateByUrl("/equipes");
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'équipe', error);
        }
      });
    }

  }

}
