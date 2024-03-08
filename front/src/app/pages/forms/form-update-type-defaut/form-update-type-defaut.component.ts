import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TypeDefaut } from '../../../shared/model/type-defaut';
import { TypeDefautService } from '../../../shared/service/type-defaut.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-update-type-defaut',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-update-type-defaut.component.html',
  styleUrl: './form-update-type-defaut.component.css'
})
export class FormUpdateTypeDefautComponent {

  formUpdate!: FormGroup;
  typeDefautById!: TypeDefaut;
  idTypeDefaut!: string;

  constructor(private typeDefautService: TypeDefautService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    // Création du formulaire de mise à jour de type projet
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

    // Récupération du paramètre "id" de la route active
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idTypeDefaut = id.toString();
        }
      }
    )

    // Préremplissage des champs par les données de l'utilisateur fournies par la méthode findById() 
    this.typeDefautService.findById(this.idTypeDefaut).subscribe(
      data => {
        this.typeDefautById = data;
        this.formUpdate.get("libelle")?.setValue(this.typeDefautById.libelle);
      }
    )
  }

  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  onSubmit() {
    if (this.formUpdate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeDefautById.libelle = this.formUpdate.get("libelle")?.value;
      this.typeDefautService.update(this.typeDefautById).subscribe({
        next: (response) => {
          alert('Type défaut modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du type défaut", error);
        }
      });
      
    }
  }

}
