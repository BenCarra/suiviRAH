import { Component } from '@angular/core';

import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { UtilisateurService } from '../../../shared/service/utilisateur.service';
import { Utilisateur } from '../../../shared/model/utilisateur';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from '../../../shared/model/site';
import { TypeUtilisateur } from '../../../shared/model/type-utilisateur';
import { SiteService } from '../../../shared/service/site.service';
import { TypeUtilisateurService } from '../../../shared/service/type-utilisateur.service';



@Component({
  selector: 'app-form-update-utilisateur',
  templateUrl: './form-update-utilisateur.component.html',
  styleUrl: './form-update-utilisateur.component.scss',
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
export class FormUpdateUtilisateurComponent {

  formUpdate!: FormGroup;
  idUtilisateur!: number;
  utilisateurById!: Utilisateur;
  sites!: Site[];
  typesUtilisateur!: TypeUtilisateur[];

  constructor(private utilisateurService: UtilisateurService, private siteService: SiteService,private typeUtilisateurService: TypeUtilisateurService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
      login: new FormControl('', Validators.required),
      prénom: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      actif: new FormControl('', Validators.required),
      site: new FormControl('', Validators.required),
      typeUtilisateur: new FormControl('', Validators.required)
    })

    // Récupération de l'identifiant de l'utilisateur à modifier
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idUtilisateur = id.toString();
        }
      }
    )

    // Récupération des sites pour l'affectation d'un utilisateur à un site
    this.siteService.findAll().subscribe(
      data => {
        this.sites = data;
      }
    )

    // Récupération des types utilisateurs pour l'affectation d'un utilisateur à un type utilisateur
    this.typeUtilisateurService.findAll().subscribe(
      data => {
        this.typesUtilisateur = data;
      }
    )

    // Récupération des informations de l'équipe à modifier à partir de son identifiant
    this.utilisateurService.findById(this.idUtilisateur).subscribe(
      data => {
        this.utilisateurById = data;
        this.formUpdate.get("login")?.setValue(this.utilisateurById.login);
        this.formUpdate.get("prénom")?.setValue(this.utilisateurById.prenomUtilisateur);
        this.formUpdate.get("nom")?.setValue(this.utilisateurById.nomUtilisateur);
        this.formUpdate.get("dateNaissance")?.setValue(this.utilisateurById.dateNaissance);
        this.formUpdate.get("mail")?.setValue(this.utilisateurById.mail);
        this.formUpdate.get("actif")?.setValue(this.utilisateurById.actif);
        this.formUpdate.get("site")?.setValue(this.utilisateurById.nomSite);
        this.formUpdate.get("typeUtilisateur")?.setValue(this.utilisateurById.libelleTypeUtilisateur);
      }
    );
  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/utilisateurs");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formUpdate.controls['login'].hasError('required') ||
      this.formUpdate.controls['prénom'].hasError('required') ||
      this.formUpdate.controls['nom'].hasError('required') ||
      this.formUpdate.controls['dateNaissance'].hasError('required') ||
      this.formUpdate.controls['mail'].hasError('required') ||
      this.formUpdate.controls['actif'].hasError('required') ||
      this.formUpdate.controls['site'].hasError('required') ||
      this.formUpdate.controls['typeUtilisateur'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formUpdate.controls['mail'].hasError('email')) {
      console.log("Mail mal formé");
    } else {
      this.utilisateurById.login = this.formUpdate.get("login")?.value;
      this.utilisateurById.prenomUtilisateur = this.formUpdate.get("prénom")?.value;
      this.utilisateurById.nomUtilisateur = this.formUpdate.get("nom")?.value;
      this.utilisateurById.dateNaissance = this.formUpdate.get("dateNaissance")?.value;
      this.utilisateurById.mail = this.formUpdate.get("mail")?.value;
      this.utilisateurById.actif = this.formUpdate.get("actif")?.value;
      this.utilisateurById.nomSite = this.formUpdate.get("site")?.value;
      this.utilisateurById.libelleTypeUtilisateur = this.formUpdate.get("typeUtilisateur")?.value;
      this.utilisateurService.update(this.utilisateurById).subscribe({
        next: (response) => {
          alert('Utilisateur modifié!');
          this.router.navigateByUrl("/utilisateurs");
        },
        error: (error) => {
          console.error("Erreur lors de la modification de l'utilisateur", error);
        }
      });
      
    }

  }
}
