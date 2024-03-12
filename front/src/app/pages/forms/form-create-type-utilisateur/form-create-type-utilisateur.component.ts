import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeUtilisateurService } from '../../../shared/service/type-utilisateur.service';
import { TypeUtilisateur } from '../../../shared/model/type-utilisateur';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-create-type-utilisateur',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-create-type-utilisateur.component.html',
  styleUrl: './form-create-type-utilisateur.component.css'
})
export class FormCreateTypeUtilisateurComponent {

  formCreate!: FormGroup;
  typeUtilisateurCree: TypeUtilisateur = new TypeUtilisateur();

  constructor(private typeUtilisateurService: TypeUtilisateurService, private router: Router) { }

  ngOnInit() {

    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeUtilisateurCree.libelle = this.formCreate.get("libelle")?.value;
      this.typeUtilisateurService.create(this.typeUtilisateurCree).subscribe({
        next: (response) => {
          alert('Type utilisateur ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du type utilisateur", error);
        }
      });
      
    }

  }

}
