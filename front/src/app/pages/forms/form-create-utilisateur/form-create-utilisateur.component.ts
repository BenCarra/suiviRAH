import { Component } from '@angular/core';

import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { UtilisateurService } from '../../../shared/service/utilisateur.service';
import { Utilisateur } from '../../../shared/model/utilisateur';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Site } from '../../../shared/model/site';
import { TypeUtilisateur } from '../../../shared/model/type-utilisateur';
import { SiteService } from '../../../shared/service/site.service';
import { TypeUtilisateurService } from '../../../shared/service/type-utilisateur.service';



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
    MatDatepickerModule,
    ReactiveFormsModule
  ],
})
export class FormCreateUtilisateurComponent {

  formCreate!: FormGroup;
  utilisateurCree: Utilisateur = new Utilisateur();
  sites!: Site[];
  typesUtilisateur!: TypeUtilisateur[];

  constructor(private utilisateurService: UtilisateurService, private siteService: SiteService, private typeUtilisateurService: TypeUtilisateurService, private router: Router) { }

  ngOnInit() {

    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      login: new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      prénom: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      actif: new FormControl('', Validators.required),
      site: new FormControl('', Validators.required),
      typeUtilisateur: new FormControl('', Validators.required)
    })

    // Récupération des sites à choisir
    this.siteService.findAll().subscribe(
      data => {
        this.sites = data;
      }
    )

    // Récupération des types utilisateur à choisir
    this.typeUtilisateurService.findAll().subscribe(
      data => {
        this.typesUtilisateur = data;
      }
    )

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/utilisateurs");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['login'].hasError('required') ||
      this.formCreate.controls['password'].hasError('required') ||
      this.formCreate.controls['prénom'].hasError('required') ||
      this.formCreate.controls['nom'].hasError('required') ||
      this.formCreate.controls['dateNaissance'].hasError('required') ||
      this.formCreate.controls['mail'].hasError('required') ||
      this.formCreate.controls['actif'].hasError('required') ||
      this.formCreate.controls['site'].hasError('required') ||
      this.formCreate.controls['typeUtilisateur'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formCreate.controls['mail'].hasError('email')) {
      console.log("Mail mal formé");
    } else {
      this.utilisateurCree.login = this.formCreate.get("login")?.value;
      this.utilisateurCree.password = this.formCreate.get("password")?.value;
      this.utilisateurCree.prenomUtilisateur = this.formCreate.get("prénom")?.value;
      this.utilisateurCree.nomUtilisateur = this.formCreate.get("nom")?.value;
      this.utilisateurCree.dateNaissance = this.formCreate.get("dateNaissance")?.value;
      this.utilisateurCree.mail = this.formCreate.get("mail")?.value;
      this.utilisateurCree.actif = this.formCreate.get("actif")?.value;
      this.utilisateurCree.nomSite = this.formCreate.get("site")?.value;
      this.utilisateurCree.libelleTypeUtilisateur = this.formCreate.get("typeUtilisateur")?.value;
      this.utilisateurService.create(this.utilisateurCree).subscribe(
        {
          next: (response) => {
            alert('Utilisateur ' + response.prenomUtilisateur + ' ' + response.nomUtilisateur + ' créé!');
            this.router.navigateByUrl("/utilisateurs");
          },
          error: (error) => {
            console.error('Erreur lors de la création de l\'utilisateur', error);
          }
        }
      );

    }

  }
}
