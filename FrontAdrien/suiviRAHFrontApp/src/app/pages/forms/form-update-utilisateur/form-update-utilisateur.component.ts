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
    MatDialogModule,
    ReactiveFormsModule
  ],
})
export class FormUpdateUtilisateurComponent {

  formUpdate!: FormGroup;
  idUtilisateur!: string;
  utilisateurById!: Utilisateur;

  constructor(private utilisateurService: UtilisateurService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formUpdate = new FormGroup({
      login: new FormControl('', Validators.required),
      prénom: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
      actif: new FormControl('', Validators.required),
      site: new FormControl(''),
      typeUtilisateur: new FormControl('')
    })

    this.activatedRoute.paramMap.subscribe(
      id => {
        let temp = id.get("id");
        if (temp != null) {
          this.idUtilisateur = temp.toString();
          //console.log(this.idUtilisateur);
        }
      }
    )


    this.utilisateurService.findById(this.idUtilisateur).subscribe(
      data => {
        this.utilisateurById = data;
        //console.log(this.utilisateurById);
        this.formUpdate.get("login")?.setValue(this.utilisateurById.login);
        this.formUpdate.get("prénom")?.setValue(this.utilisateurById.prenomUtilisateur);
        this.formUpdate.get("nom")?.setValue(this.utilisateurById.nomUtilisateur);
        this.formUpdate.get("mail")?.setValue(this.utilisateurById.mail);
        this.formUpdate.get("actif")?.setValue(this.utilisateurById.actif);
        this.formUpdate.get("site")?.setValue(this.utilisateurById.site);
        this.formUpdate.get("typeUtilisateur")?.setValue(this.utilisateurById.typeUtilisateur);
        //console.log(this.formUpdate);
      }
      
    );
  }

  /*hasUnitNumber = false; */ 

  onClose(){
    this.router.navigateByUrl("/admin/utilisateurs");
  }

  onSubmit(): void {
    console.log();
    this.utilisateurById.login = this.formUpdate.get("login")?.value;
    this.utilisateurById.prenomUtilisateur = this.formUpdate.get("prénom")?.value;
    this.utilisateurById.nomUtilisateur = this.formUpdate.get("nom")?.value;
    this.utilisateurById.mail = this.formUpdate.get("mail")?.value;
    this.utilisateurById.actif = this.formUpdate.get("actif")?.value;
    this.utilisateurById.site = this.formUpdate.get("site")?.value;
    this.utilisateurById.typeUtilisateur = this.formUpdate.get("typeUtilisateur")?.value;
    console.log(this.utilisateurById);
    this.utilisateurService.update(this.utilisateurById).subscribe();
    alert('Thanks!');
    this.router.navigateByUrl("/admin/utilisateurs");
  }
}
