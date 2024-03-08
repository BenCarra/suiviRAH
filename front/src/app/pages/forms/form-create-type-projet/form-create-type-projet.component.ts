import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeProjet } from '../../../shared/model/type-projet';
import { TypeProjetService } from '../../../shared/service/type-projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-create-type-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-create-type-projet.component.html',
  styleUrl: './form-create-type-projet.component.css'
})
export class FormCreateTypeProjetComponent {

  formCreate!: FormGroup;
  typeProjetCree: TypeProjet = new TypeProjet();

  constructor(private typeProjetService: TypeProjetService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formCreate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

  }

  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  onSubmit(): void {

    if (this.formCreate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.typeProjetCree.libelle = this.formCreate.get("libelle")?.value;
      this.typeProjetService.create(this.typeProjetCree).subscribe({
        next: (response) => {
          alert('Type projet ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du type projet", error);
        }
      });
      
    }
  
  }

}
