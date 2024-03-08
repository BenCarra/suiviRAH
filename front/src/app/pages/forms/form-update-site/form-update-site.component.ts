import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Site } from '../../../shared/model/site';
import { SiteService } from '../../../shared/service/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-update-site',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-update-site.component.html',
  styleUrl: './form-update-site.component.css'
})
export class FormUpdateSiteComponent {

  formUpdate!: FormGroup;
  idSite!: string;
  siteById!: Site;

  constructor(private siteService: SiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.formUpdate = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      codePostal: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[0-9]{5}")])),
      ville: new FormControl('', Validators.required)
    })


    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.idSite = id.toString();
        }
      }
    )

    this.siteService.findById(this.idSite).subscribe(
      data => {
        this.siteById = data;
        this.formUpdate.get("nom")?.setValue(this.siteById.nomSite);
        this.formUpdate.get("adresse")?.setValue(this.siteById.adresseSite);
        this.formUpdate.get("codePostal")?.setValue(this.siteById.codePostalSite);
        this.formUpdate.get("ville")?.setValue(this.siteById.villeSite);
      }
    );
  }

  onClose() {
    this.router.navigateByUrl("/admin/parametres");
  }

  onSubmit(): void {

    if (this.formUpdate.controls['nom'].hasError('required') ||
    this.formUpdate.controls['adresse'].hasError('required') ||
    this.formUpdate.controls['codePostal'].hasError('required') ||
    this.formUpdate.controls['ville'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else if (this.formUpdate.controls['codePostal'].hasError('pattern')){
      console.log("Le code postal doit être composé de 5 chiffres");
    } else {
      this.siteById.nomSite = this.formUpdate.get("nom")?.value;
      this.siteById.adresseSite = this.formUpdate.get("adresse")?.value;
      this.siteById.codePostalSite = this.formUpdate.get("codePostal")?.value;
      this.siteById.villeSite = this.formUpdate.get("ville")?.value;
      this.siteService.update(this.siteById).subscribe({
        next: (response) => {
          alert('Site modifié!');
          this.router.navigateByUrl("/admin/parametres");
        },
        error: (error) => {
          console.error("Erreur lors de la modification du site", error);
        }
      });
      
    }
  }
}
