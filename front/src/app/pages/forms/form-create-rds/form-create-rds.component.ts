import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RDS } from '../../../shared/model/rds';
import { RDSService } from '../../../shared/service/rds.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-create-rds',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-create-rds.component.html',
  styleUrl: './form-create-rds.component.css'
})
export class FormCreateRdsComponent {

  formCreate!: FormGroup;
  rdsCree: RDS = new RDS();

  constructor(private rdsService: RDSService, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      nom: new FormControl('', Validators.required),
      direction: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required)
    });

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/rds");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['nom'].hasError('required') ||
    this.formCreate.controls['direction'].hasError('required') || 
    this.formCreate.controls['service'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.rdsCree.nom = this.formCreate.get("nom")?.value;
      this.rdsCree.direction = this.formCreate.get("direction")?.value;
      this.rdsCree.service = this.formCreate.get("service")?.value;

      this.rdsService.create(this.rdsCree).subscribe({
        next: (response) => {
          alert('RDS ' + response.nom + ' créé!');
          this.router.navigateByUrl("/rds");
        },
        error: (error) => {
          console.error('Erreur lors de la création du RDS', error);
        }
      });
    }

  }

}
