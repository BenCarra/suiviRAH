import { Component } from '@angular/core';
import { TypeDefaut } from '../../shared/model/type-defaut';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeDefautService } from '../../shared/service/type-defaut.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-type-defaut-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './type-defaut-list.component.html',
  styleUrl: './type-defaut-list.component.css'
})
export class TypeDefautListComponent {

  listTypesDefaut!: TypeDefaut[];
  listLibellesTypesDefaut: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private typeDefautService: TypeDefautService) {

  }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeDefautRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.typeDefautService.findAll().subscribe(data => {
      this.listTypesDefaut = data;
    })
    this.formFiltrage.get('typeDefautRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('typeDefautRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type défaut') {
        this.listLibellesTypesDefaut = [];
        this.typeDefautService.findAll().subscribe(data => {
          data.forEach((typeDefaut) => {
            if (!this.listLibellesTypesDefaut.includes(typeDefaut.libelle)) {
              this.listLibellesTypesDefaut.push(typeDefaut.libelle);
            }
          });
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('typeDefautRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type défaut') {
      this.typeDefautService.findByLibelle(recherche!).subscribe(
        data => {
          this.listTypesDefaut = [];
          this.listTypesDefaut.push(data);
        }
      )
    }

  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('typeDefautRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeDefautService.findAll().subscribe(data => {
      this.listTypesDefaut = data;
    })
  }

}
