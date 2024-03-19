import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeProjet } from '../../../shared/model/type-projet';
import { TypeProjetService } from '../../../shared/service/type-projet.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-create-type-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-create-type-projet.component.html',
  styleUrl: './form-create-type-projet.component.css'
})
export class FormCreateTypeProjetComponent {

  formCreate!: FormGroup;
  typeProjetCree: TypeProjet = new TypeProjet();

  constructor(private typeProjetService: TypeProjetService, private router: Router) { }

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
      this.typeProjetCree.libelle = this.formCreate.get("libelle")?.value;
      this.typeProjetService.create(this.typeProjetCree).subscribe({
        next: (response) => {
          alert('Type projet ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du type projet", error);
        }
      });
      
    }
  
  }

}
