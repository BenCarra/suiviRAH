import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';;
import { TypeDefaut } from '../../../shared/model/type-defaut';
import { TypeDefautService } from '../../../shared/service/type-defaut.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-update-type-defaut',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-update-type-defaut.component.html',
  styleUrl: './form-update-type-defaut.component.css'
})
export class FormUpdateTypeDefautComponent {

  formUpdate!: FormGroup;
  typeDefautById!: TypeDefaut;
  idTypeDefaut!: string;

  constructor(private typeDefautService: TypeDefautService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

    // Récupération de l'identifiant du type de défaut à modifier
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idTypeDefaut = id.toString();
        }
      }
    )

    // Récupération des informations du type de défaut à modifier à partir de son identifiant
    this.typeDefautService.findById(this.idTypeDefaut).subscribe(
      data => {
        this.typeDefautById = data;
        this.formUpdate.get("libelle")?.setValue(this.typeDefautById.libelle);
      }
    )
  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/parametres");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit() {
    if (this.formUpdate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeDefautById.libelle = this.formUpdate.get("libelle")?.value;
      this.typeDefautService.update(this.typeDefautById).subscribe({
        next: (response) => {
          alert('Type défaut modifié!');
          this.router.navigateByUrl("/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du type défaut", error);
        }
      });
      
    }
  }

}
