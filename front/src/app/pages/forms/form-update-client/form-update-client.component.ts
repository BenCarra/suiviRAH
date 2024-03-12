import { Component } from '@angular/core';

import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Client } from '../../../shared/model/client';
import { ClientService } from '../../../shared/service/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-update-client',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-update-client.component.html',
  styleUrl: './form-update-client.component.css'
})
export class FormUpdateClientComponent {

  formUpdate!: FormGroup;
  idClient!: string;
  clientById!: Client;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      codePostal: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]{5}$")])),
      ville: new FormControl('', Validators.required),
      actif: new FormControl('', Validators.required)
    })

    // Récupération de l'identifiant du client à modifier
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idClient = id.toString();
        }
      }
    )

    // Récupération des informations du client à modifier à partir de son identifiant
    this.clientService.findById(this.idClient).subscribe(
      data => {
        this.clientById = data;
        this.formUpdate.get("nom")?.setValue(this.clientById.nomClient);
        this.formUpdate.get("adresse")?.setValue(this.clientById.adresseClient);
        this.formUpdate.get("codePostal")?.setValue(this.clientById.codePostalClient);
        this.formUpdate.get("ville")?.setValue(this.clientById.villeClient);
        this.formUpdate.get("actif")?.setValue(this.clientById.actif);
      }
    );
  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/admin/clients");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formUpdate.controls['nom'].hasError('required') ||
      this.formUpdate.controls['adresse'].hasError('required') ||
      this.formUpdate.controls['codePostal'].hasError('required') ||
      this.formUpdate.controls['ville'].hasError('required') || 
      this.formUpdate.controls['actif'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formUpdate.controls['codePostal'].hasError('pattern')) {
      console.log("Le code postal doit être composé de 5 chiffres")
    } else {
      this.clientById.nomClient = this.formUpdate.get("nom")?.value;
      this.clientById.adresseClient = this.formUpdate.get("adresse")?.value;
      this.clientById.codePostalClient = this.formUpdate.get("codePostal")?.value;
      this.clientById.villeClient = this.formUpdate.get("ville")?.value;
      this.clientById.actif = this.formUpdate.get('actif')?.value
      this.clientService.update(this.clientById).subscribe({
        next: (response) => {
          alert('Client modifié!');
          this.router.navigateByUrl("/admin/clients");
        },
        error: (error) => {
          console.error('Erreur lors de la modification du client', error);
        }
      });

      
    }

  }

}
