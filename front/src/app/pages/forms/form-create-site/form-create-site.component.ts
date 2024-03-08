import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Site } from '../../../shared/model/site';
import { SiteService } from '../../../shared/service/site.service';
import { UtilisateurService } from '../../../shared/service/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-create-site',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-create-site.component.html',
  styleUrl: './form-create-site.component.css'
})
export class FormCreateSiteComponent {

  formCreate!: FormGroup;
  siteCree: Site = new Site();

  constructor(private siteService: SiteService, private utilisateurService: UtilisateurService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formCreate = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      codePostal: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[0-9]{5}")])),
      ville: new FormControl('', Validators.required)
    })

  }

  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  onSubmit(): void {

    if (this.formCreate.controls['nom'].hasError('required') ||
    this.formCreate.controls['adresse'].hasError('required') ||
    this.formCreate.controls['codePostal'].hasError('required') ||
    this.formCreate.controls['ville'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formCreate.controls['codePostal'].hasError('pattern')){
      console.log("Le code postal doit être composé de 5 chiffres");
    } else {
      this.siteCree.nomSite = this.formCreate.get("nom")?.value;
      this.siteCree.adresseSite = this.formCreate.get("adresse")?.value;
      this.siteCree.codePostalSite = this.formCreate.get("codePostal")?.value;
      this.siteCree.villeSite = this.formCreate.get("ville")?.value;
      this.siteService.create(this.siteCree).subscribe({
        next: (response) => {
          alert('Site ' + response.nomSite + ' créé!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la création du site", error);
        }
      });
      
    }

  }

}
