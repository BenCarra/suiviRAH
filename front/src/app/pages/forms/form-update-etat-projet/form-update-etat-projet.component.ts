import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EtatProjet } from '../../../shared/model/etat-projet';
import { EtatProjetService } from '../../../shared/service/etat-projet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-update-etat-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-update-etat-projet.component.html',
  styleUrl: './form-update-etat-projet.component.css'
})
export class FormUpdateEtatProjetComponent {

  formUpdate!: FormGroup;
  etatProjetById!: EtatProjet;
  idEtatProjet!: string;

  constructor(private etatProjetService: EtatProjetService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    // Création du formulaire de mise à jour de l'état de projet
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

    // Récupération du paramètre "id" de la route active
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idEtatProjet = id.toString();
        }
      }
    )

    // Préremplissage des champs par les données de l'état de projet fournies par la méthode findById() 
    this.etatProjetService.findById(this.idEtatProjet).subscribe(
      data => {
        this.etatProjetById = data;
        this.formUpdate.get("libelle")?.setValue(this.etatProjetById.libelle);
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
      this.etatProjetById.libelle = this.formUpdate.get("libelle")?.value;
      this.etatProjetService.update(this.etatProjetById).subscribe({
        next: (response) => {
          alert('Etat de projet modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification de l'état de projet", error);
        }
      });
      
    }
  }

}
