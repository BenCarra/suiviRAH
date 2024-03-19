import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeDefaut } from '../../../shared/model/type-defaut';
import { TypeDefautService } from '../../../shared/service/type-defaut.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-form-create-type-defaut',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-create-type-defaut.component.html',
  styleUrl: './form-create-type-defaut.component.css'
})
export class FormCreateTypeDefautComponent {

  formCreate!: FormGroup;
  typeDefautCree: TypeDefaut = new TypeDefaut();

  constructor(private typeDefautService: TypeDefautService, private router: Router) { }

  ngOnInit() {

    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/parametres");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeDefautCree.libelle = this.formCreate.get("libelle")?.value;
      this.typeDefautService.create(this.typeDefautCree).subscribe({
        next: (response) => {
          alert('Type défaut ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du type défaut", error);
        }
      });
      
    }
  
  }

}
