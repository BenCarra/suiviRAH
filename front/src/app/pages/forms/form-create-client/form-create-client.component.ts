import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../../shared/model/client';
import { ClientService } from '../../../shared/service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-create-client',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-create-client.component.html',
  styleUrl: './form-create-client.component.css'
})
export class FormCreateClientComponent {

  formCreate!: FormGroup;
  clientCree: Client = new Client();

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formCreate = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      codePostal: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]{5}$")])),
      ville: new FormControl('', Validators.required)
    })

  }

  onClose() {
    this.router.navigateByUrl("/admin/clients");
  }

  onSubmit(): void {

    if (this.formCreate.controls['nom'].hasError('required') ||
      this.formCreate.controls['adresse'].hasError('required') ||
      this.formCreate.controls['codePostal'].hasError('required') ||
      this.formCreate.controls['ville'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formCreate.controls['codePostal'].hasError('pattern')) {
      console.log("Le code postal doit être composé de 5 chiffres")
    }
    else {
      this.clientCree.nomClient = this.formCreate.get("nom")?.value;
      this.clientCree.adresseClient = this.formCreate.get("adresse")?.value;
      this.clientCree.codePostalClient = this.formCreate.get("codePostal")?.value;
      this.clientCree.villeClient = this.formCreate.get("ville")?.value;
      this.clientService.create(this.clientCree).subscribe({
        next: (response) => {
          alert('Client ' + response.nomClient + ' créé!');
        },
        error: (error) => {
          console.error('Erreur lors de la création du client', error);
        }
      });
      this.router.navigateByUrl("/admin/clients");
    }

  }
}
