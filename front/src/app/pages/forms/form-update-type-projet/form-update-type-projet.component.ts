import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TypeProjetService } from '../../../shared/service/type-projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeProjet } from '../../../shared/model/type-projet';

@Component({
  selector: 'app-form-update-type-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-update-type-projet.component.html',
  styleUrl: './form-update-type-projet.component.css'
})
export class FormUpdateTypeProjetComponent {

  formUpdate!: FormGroup;
  typeProjetById!: TypeProjet;
  idTypeProjet!: string;

  constructor(private typeProjetService: TypeProjetService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

    // Récupération de l'identifiant du type de projet à modifier
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idTypeProjet = id.toString();
        }
      }
    )

    // Récupération des informations du type de projet à modifier à partir de son identifiant
    this.typeProjetService.findById(this.idTypeProjet).subscribe(
      data => {
        this.typeProjetById = data;
        this.formUpdate.get("libelle")?.setValue(this.typeProjetById.libelle);
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
      this.typeProjetById.libelle = this.formUpdate.get("libelle")?.value;
      this.typeProjetService.update(this.typeProjetById).subscribe({
        next: (response) => {
          alert('Type projet modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du type projet", error);
        }
      });
      
    }
  }

}
