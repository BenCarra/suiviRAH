import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipe } from '../../../shared/model/equipe';
import { EquipeService } from '../../../shared/service/equipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-update-equipe',
  standalone: true,
  imports: [DatePipe,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-update-equipe.component.html',
  styleUrl: './form-update-equipe.component.css'
})
export class FormUpdateEquipeComponent {

  formUpdate!: FormGroup;
  idEquipe!: string;
  equipeById!: Equipe;

  constructor(private equipeService: EquipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formUpdate = new FormGroup({
      libelle: new FormControl('', Validators.required),
    })


    this.activatedRoute.paramMap.subscribe(
      id => {
        let temp = id.get("id");
        if (temp != null) {
          this.idEquipe = temp.toString();
        }
      }
    )


    this.equipeService.findById(this.idEquipe).subscribe(
      data => {
        this.equipeById = data;
        this.formUpdate.get("libelle")?.setValue(this.equipeById.libelle);
      }
    );
  }

  onClose() {
    this.router.navigateByUrl("/admin/equipes");
  }

  onSubmit(): void {

    if (this.formUpdate.controls['libelle'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.equipeById.libelle = this.formUpdate.get("libelle")?.value;
      this.equipeService.update(this.equipeById).subscribe();
      alert('Equipe modifiée!');
      this.router.navigateByUrl("/admin/equipes");
    }

  }

}
