import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../../../shared/model/utilisateur';
import { UtilisateurService } from '../../../shared/service/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeUtilisateurService } from '../../../shared/service/type-utilisateur.service';
import { TypeUtilisateur } from '../../../shared/model/type-utilisateur';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-create-type-utilisateur',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-create-type-utilisateur.component.html',
  styleUrl: './form-create-type-utilisateur.component.css'
})
export class FormCreateTypeUtilisateurComponent {

  formCreate!: FormGroup;
  typeUtilisateurCree: TypeUtilisateur = new TypeUtilisateur();

  constructor(private typeUtilisateurService: TypeUtilisateurService, private utilisateurService: UtilisateurService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formCreate = new FormGroup({
      libelle: new FormControl('', Validators.required),
      utilisateurs: new FormControl('', Validators.required)
    })

  }

  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  onSubmit(): void {

    if (this.formCreate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeUtilisateurCree.libelle = this.formCreate.get("libelle")?.value;
      this.typeUtilisateurService.create(this.typeUtilisateurCree).subscribe({
        next: (response) => {
          alert('Type utilisateur ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du type utilisateur", error);
        }
      });
      
    }

  }

}
