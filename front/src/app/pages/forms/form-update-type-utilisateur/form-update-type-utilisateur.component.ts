import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TypeUtilisateurService } from '../../../shared/service/type-utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeUtilisateur } from '../../../shared/model/type-utilisateur';

@Component({
  selector: 'app-form-update-type-utilisateur',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-update-type-utilisateur.component.html',
  styleUrl: './form-update-type-utilisateur.component.css'
})
export class FormUpdateTypeUtilisateurComponent {

  formUpdate!: FormGroup;
  typeUtilisateurById!: TypeUtilisateur;
  idTypeUtilisateur!: string;
  typesUtilisateurs!: TypeUtilisateur[];

  constructor(private typeUtilisateurService: TypeUtilisateurService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

    // Récupération de l'identifiant du type utilisateur à modifier
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idTypeUtilisateur = id.toString();
        }
      }
    )

    // Récupération des informations du type utilisateur à modifier à partir de son identifiant
    this.typeUtilisateurService.findById(this.idTypeUtilisateur).subscribe(
      data => {
        this.typeUtilisateurById = data;
        this.formUpdate.get("libelle")?.setValue(this.typeUtilisateurById.libelle);
      }
    )
  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit() {
    if (this.formUpdate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeUtilisateurById.libelle = this.formUpdate.get("libelle")?.value;
      this.typeUtilisateurService.update(this.typeUtilisateurById).subscribe({
        next: (response) => {
          alert('Type utilisateur modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du type utilisateur", error);
        }
      });
      
    }
  }

}
