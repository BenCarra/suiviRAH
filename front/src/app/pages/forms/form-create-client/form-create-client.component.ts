import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../../shared/model/client';
import { ClientService } from '../../../shared/service/client.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-form-create-client',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './form-create-client.component.html',
  styleUrl: './form-create-client.component.css'
})
export class FormCreateClientComponent {

  formCreate!: FormGroup;
  clientCree: Client = new Client();

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      codePostal: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]{5}$")])),
      ville: new FormControl('', Validators.required),
      actif: new FormControl('', Validators.required),
      modeFonctionnementMCO: new FormControl('', Validators.required)
    })

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/admin/clients");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['nom'].hasError('required') ||
      this.formCreate.controls['adresse'].hasError('required') ||
      this.formCreate.controls['codePostal'].hasError('required') ||
      this.formCreate.controls['ville'].hasError('required') ||
      this.formCreate.controls['actif'].hasError('required') ||
      this.formCreate.controls['modeFonctionnementMCO'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formCreate.controls['codePostal'].hasError('pattern')) {
      console.log("Le code postal doit être composé de 5 chiffres");
    }
    else {
      this.clientCree.nomClient = this.formCreate.get("nom")?.value;
      this.clientCree.adresseClient = this.formCreate.get("adresse")?.value;
      this.clientCree.codePostalClient = this.formCreate.get("codePostal")?.value;
      this.clientCree.villeClient = this.formCreate.get("ville")?.value;
      this.clientCree.actif = this.formCreate.get('actif')?.value;
      this.clientCree.modeFonctionnementMCO = this.formCreate.get('modeFonctionnementMCO')?.value;
      this.clientService.create(this.clientCree).subscribe({
        next: (response) => {
          alert('Client ' + response.nomClient + ' créé!');
          this.router.navigateByUrl("/admin/clients");
        },
        error: (error) => {
          console.error('Erreur lors de la création du client', error);
        }
      });
    }

  }
}
