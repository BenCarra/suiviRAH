import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RDS } from '../../../shared/model/rds';
import { RDSService } from '../../../shared/service/rds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-update-rds',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-update-rds.component.html',
  styleUrl: './form-update-rds.component.css'
})
export class FormUpdateRdsComponent {

  formUpdate!: FormGroup;
  idRDS!: string;
  rdsById!: RDS;

  constructor(private rdsService: RDSService, private activatedRoute: ActivatedRoute,private router: Router){

  }

  ngOnInit() {
    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
      nom: new FormControl('', Validators.required),
      direction: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required)
    });

    // Récupération de l'identifiant du rds à modifier
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idRDS = id.toString();
        }
      }
    )

    // Récupération des informations de site à modifier à partir de son identifiant
    this.rdsService.findById(this.idRDS).subscribe(
      data => {
        this.rdsById = data;
        this.formUpdate.get("nom")?.setValue(this.rdsById.nom);
        this.formUpdate.get("direction")?.setValue(this.rdsById.direction);
        this.formUpdate.get("service")?.setValue(this.rdsById.service);
      }
    );

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/rds");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formUpdate.controls['nom'].hasError('required') ||
    this.formUpdate.controls['direction'].hasError('required') || 
    this.formUpdate.controls['service'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.rdsById.nom = this.formUpdate.get("nom")?.value;
      this.rdsById.direction = this.formUpdate.get("direction")?.value;
      this.rdsById.service = this.formUpdate.get("service")?.value;

      this.rdsService.update(this.rdsById).subscribe({
        next: (response) => {
          alert('RDS ' + response.nom + ' modifié!');
          this.router.navigateByUrl("/rds");
        },
        error: (error) => {
          console.error('Erreur lors de la modification du RDS', error);
        }
      });
    }

  }

}
