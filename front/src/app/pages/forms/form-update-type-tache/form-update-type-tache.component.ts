import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TypeTache } from '../../../shared/model/type-tache';
import { TypeTacheService } from '../../../shared/service/type-tache.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-update-type-tache',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-update-type-tache.component.html',
  styleUrl: './form-update-type-tache.component.css'
})
export class FormUpdateTypeTacheComponent {

  formUpdate!: FormGroup;
  typeTacheById!: TypeTache;
  idTypeTache!: string;

  constructor(private typeTacheService: TypeTacheService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    // Création du formulaire de mise à jour de type tâche
    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

    // Récupération du paramètre "id" de la route active
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idTypeTache = id.toString();
        }
      }
    )

    // Préremplissage des champs par les données du type tâche fournies par la méthode findById() 
    this.typeTacheService.findById(this.idTypeTache).subscribe(
      data => {
        this.typeTacheById = data;
        this.formUpdate.get("libelle")?.setValue(this.typeTacheById.libelle);
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
      this.typeTacheById.libelle = this.formUpdate.get("libelle")?.value;
      this.typeTacheService.update(this.typeTacheById).subscribe({
        next: (response) => {
          alert('Type tâche modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du type tâche", error);
        }
      });
      
    }
  }

}
