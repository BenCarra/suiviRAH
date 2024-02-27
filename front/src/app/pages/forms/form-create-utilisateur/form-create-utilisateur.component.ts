import { Component, Input } from '@angular/core';

import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { UtilisateurService } from '../../../shared/service/utilisateur.service';
import { Utilisateur } from '../../../shared/model/utilisateur';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';



@Component({
  selector: 'app-form-create-utilisateur',
  templateUrl: './form-create-utilisateur.component.html',
  styleUrl: './form-create-utilisateur.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
})
export class FormCreateUtilisateurComponent {

  formCreate!: FormGroup;
  utilisateurCree: Utilisateur = new Utilisateur();

  constructor(private utilisateurService: UtilisateurService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formCreate = new FormGroup({
      login: new FormControl('', Validators.required),
      prénom: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      actif: new FormControl('',Validators.required),
    })

  }

  onClose(){
    this.router.navigateByUrl("/admin/utilisateurs");
  }

  onSubmit(): void {

    console.log(this.formCreate.get("dateNaissance")?.value);
    if (this.formCreate.controls['login'].hasError('required') ||
    this.formCreate.controls['prénom'].hasError('required') ||
    this.formCreate.controls['nom'].hasError('required') ||
    this.formCreate.controls['dateNaissance'].hasError('required') ||
    this.formCreate.controls['mail'].hasError('required') ||
    this.formCreate.controls['actif'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formCreate.controls['mail'].hasError('email')) {
      console.log("Mail mal formé");
    } else {
      this.utilisateurCree.login = this.formCreate.get("login")?.value;
      this.utilisateurCree.prenomUtilisateur = this.formCreate.get("prénom")?.value;
      this.utilisateurCree.nomUtilisateur = this.formCreate.get("nom")?.value;
      this.utilisateurCree.dateNaissance = this.formCreate.get("dateNaissance")?.value;
      this.utilisateurCree.mail = this.formCreate.get("mail")?.value;
      this.utilisateurCree.actif = this.formCreate.get("actif")?.value;
      this.utilisateurService.create(this.utilisateurCree).subscribe();
      alert('Utilisateur Créé!');
      this.router.navigateByUrl("/admin/utilisateurs");
    }
    
  }
}
