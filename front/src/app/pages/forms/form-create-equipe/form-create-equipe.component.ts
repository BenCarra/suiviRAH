import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Equipe } from '../../../shared/model/equipe';
import { EquipeService } from '../../../shared/service/equipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-create-equipe',
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
  templateUrl: './form-create-equipe.component.html',
  styleUrl: './form-create-equipe.component.css'
})
export class FormCreateEquipeComponent {

  formCreate!: FormGroup;
  equipeCreee: Equipe = new Equipe();

  constructor(private equipeService: EquipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formCreate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })

  }

  onClose() {
    this.router.navigateByUrl("/admin/equipes");
  }

  onSubmit(): void {

    if (this.formCreate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.equipeCreee.libelle = this.formCreate.get("libelle")?.value;
      this.equipeService.create(this.equipeCreee).subscribe({
        next: (response) => {
          alert('Equipe ' + response.libelle + ' créée!');
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'équipe', error);
        }
      });
      this.router.navigateByUrl("/admin/equipes");
    }

  }

}
