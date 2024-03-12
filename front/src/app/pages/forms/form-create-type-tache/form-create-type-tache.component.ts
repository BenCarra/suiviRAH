import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TypeTache } from '../../../shared/model/type-tache';
import { TypeTacheService } from '../../../shared/service/type-tache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-type-tache',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-create-type-tache.component.html',
  styleUrl: './form-create-type-tache.component.css'
})
export class FormCreateTypeTacheComponent {

  formCreate!: FormGroup;
  typeTacheCree: TypeTache = new TypeTache();

  constructor(private typeTacheService: TypeTacheService, private router: Router) { }

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
      this.typeTacheCree.libelle = this.formCreate.get("libelle")?.value;
      this.typeTacheService.create(this.typeTacheCree).subscribe({
        next: (response) => {
          alert('Type tâche ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du type tâche", error);
        }
      });
      
    }
  
  }

}
