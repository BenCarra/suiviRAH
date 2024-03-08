import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeDefaut } from '../../../shared/model/type-defaut';
import { TypeDefautService } from '../../../shared/service/type-defaut.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-create-type-defaut',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-create-type-defaut.component.html',
  styleUrl: './form-create-type-defaut.component.css'
})
export class FormCreateTypeDefautComponent {

  formCreate!: FormGroup;
  typeDefautCree: TypeDefaut = new TypeDefaut();

  constructor(private typeDefautService: TypeDefautService, private router: Router) { }

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
      this.typeDefautCree.libelle = this.formCreate.get("libelle")?.value;
      this.typeDefautService.create(this.typeDefautCree).subscribe({
        next: (response) => {
          alert('Type défaut ' + response.libelle + ' créé!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du type défaut", error);
        }
      });
      
    }
  
  }

}
