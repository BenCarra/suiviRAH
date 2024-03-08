import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TypeUtilisateurService } from '../../../shared/service/type-utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeUtilisateur } from '../../../shared/model/type-utilisateur';

@Component({
  selector: 'app-form-update-type-utilisateur',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
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

    // Création du formulaire de mise à jour de type utilisateur
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

    // Récupération du paramètre "id" de la route active
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idTypeUtilisateur = id.toString();
        }
      }
    )

    // Préremplissage des champs par les données de l'utilisateur fournies par la méthode findById() 
    this.typeUtilisateurService.findById(this.idTypeUtilisateur).subscribe(
      data => {
        this.typeUtilisateurById = data;
        this.formUpdate.get("libelle")?.setValue(this.typeUtilisateurById.libelle);
      }
    )
  }

  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  onSubmit() {
    if (this.formUpdate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeUtilisateurById.libelle = this.formUpdate.get("libelle")?.value;
      this.typeUtilisateurService.update(this.typeUtilisateurById).subscribe({
        next: (response) => {
          alert('Type utilisateur ' + response.libelle + ' modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du type utilisateur", error);
        }
      });
      
    }
  }

}
