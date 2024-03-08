import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TypeProjetService } from '../../../shared/service/type-projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeProjet } from '../../../shared/model/type-projet';

@Component({
  selector: 'app-form-update-type-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-update-type-projet.component.html',
  styleUrl: './form-update-type-projet.component.css'
})
export class FormUpdateTypeProjetComponent {

  formUpdate!: FormGroup;
  typeProjetById!: TypeProjet;
  idTypeProjet!: string;

  constructor(private typeProjetService: TypeProjetService, private activatedRoute: ActivatedRoute, private router: Router) {

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
          this.idTypeProjet = id.toString();
        }
      }
    )

    // Préremplissage des champs par les données de l'utilisateur fournies par la méthode findById() 
    this.typeProjetService.findById(this.idTypeProjet).subscribe(
      data => {
        this.typeProjetById = data;
        this.formUpdate.get("libelle")?.setValue(this.typeProjetById.libelle);
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
      this.typeProjetById.libelle = this.formUpdate.get("libelle")?.value;
      this.typeProjetService.update(this.typeProjetById).subscribe({
        next: (response) => {
          alert('Type projet modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du type projet", error);
        }
      });
      
    }
  }

}
