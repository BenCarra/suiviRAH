import { Component } from '@angular/core';
import { TypeProjet } from '../../shared/model/type-projet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeProjetService } from '../../shared/service/type-projet.service';

@Component({
  selector: 'app-type-projet-list',
  standalone: true,
  imports: [],
  templateUrl: './type-projet-list.component.html',
  styleUrl: './type-projet-list.component.css'
})
export class TypeProjetListComponent {

  listTypesProjet!: TypeProjet[];
  listLibellesTypesProjet: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private typeProjetService: TypeProjetService) {

  }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeProjetRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.typeProjetService.findAll().subscribe(data => {
      this.listTypesProjet = data;
    })
    this.formFiltrage.get('typeProjetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('typeProjetRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type projet') {
        this.listLibellesTypesProjet = [];
        this.typeProjetService.findAll().subscribe(data => {
          data.forEach((typeProjet) => {
            if (!this.listLibellesTypesProjet.includes(typeProjet.libelle)) {
              this.listLibellesTypesProjet.push(typeProjet.libelle);
            }
          });
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('typeProjetRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type projet') {
      this.typeProjetService.findByLibelle(recherche!).subscribe(
        data => {
          this.listTypesProjet = [];
          this.listTypesProjet.push(data);
        }
      )
    }

  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeProjetService.findAll().subscribe(data => {
      this.listTypesProjet = data;
    })
  }

}
