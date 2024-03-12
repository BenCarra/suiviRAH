import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipe } from '../../../shared/model/equipe';
import { EquipeService } from '../../../shared/service/equipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Utilisateur } from '../../../shared/model/utilisateur';
import { UtilisateurService } from '../../../shared/service/utilisateur.service';

@Component({
  selector: 'app-form-update-equipe',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-update-equipe.component.html',
  styleUrl: './form-update-equipe.component.css'
})
export class FormUpdateEquipeComponent {

  formUpdate!: FormGroup;
  idEquipe!: string;
  equipeById!: Equipe;
  utilisateurs!: Utilisateur[];

  constructor(private equipeService: EquipeService, private utilisateurService: UtilisateurService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
      utilisateurs: new FormControl('', Validators.required)
    })

    // Récupération de l'identifiant de l'équipe à modifier
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idEquipe = id.toString();
        }
      }
    )

    // Récupération des informations de l'équipe à modifier à partir de son identifiant
    this.equipeService.findById(this.idEquipe).subscribe(
      data => {
        this.equipeById = data;
        this.formUpdate.get("libelle")?.setValue(this.equipeById.libelle);
        this.formUpdate.get("utilisateurs")?.setValue(this.equipeById.listUtilisateurs);
      }
    );

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
    this.router.navigateByUrl("/admin/equipes");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formUpdate.controls['libelle'].hasError('required') ||
    this.formUpdate.controls['utilisateurs'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.equipeById.libelle = this.formUpdate.get("libelle")?.value;
      this.equipeById.listUtilisateurs = this.formUpdate.get("utilisateurs")?.value;
      this.equipeService.update(this.equipeById).subscribe({
        next: (response) => {
          alert('Equipe modifiée!');
          this.router.navigateByUrl("/admin/equipes");
        },
        error: (error) => {
          console.error("Erreur lors de la modification de l'équipe", error);
        }
      });
      
    }

  }

}
