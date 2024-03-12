import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { EtatProjet } from '../../../shared/model/etat-projet';
import { EtatProjetService } from '../../../shared/service/etat-projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-etat-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-create-etat-projet.component.html',
  styleUrl: './form-create-etat-projet.component.css'
})
export class FormCreateEtatProjetComponent {

  formCreate!: FormGroup;
  etatProjetCree: EtatProjet = new EtatProjet();

  constructor(private etatProjetService: EtatProjetService, private router: Router) { }

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
      this.etatProjetCree.libelle = this.formCreate.get("libelle")?.value;
      this.etatProjetService.create(this.etatProjetCree).subscribe({
        next: (response) => {
          alert('Etat de projet ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création de l'état de projet", error);
        }
      });
      
    }
  
  }

}
