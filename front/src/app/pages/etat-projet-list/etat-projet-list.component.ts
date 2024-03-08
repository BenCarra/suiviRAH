import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EtatProjet } from '../../shared/model/etat-projet';
import { EtatProjetService } from '../../shared/service/etat-projet.service';

@Component({
  selector: 'app-etat-projet-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './etat-projet-list.component.html',
  styleUrl: './etat-projet-list.component.css'
})
export class EtatProjetListComponent {

  listEtatsProjet!: EtatProjet[];
  listLibellesEtatsProjet: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private etatProjetService: EtatProjetService) {

  }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      etatProjetRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.etatProjetService.findAll().subscribe(data => {
      this.listEtatsProjet = data;
    })
    this.formFiltrage.get('etatProjetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('etatProjetRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé d\'état de projet') {
        this.listLibellesEtatsProjet = [];
        this.etatProjetService.findAll().subscribe(data => {
          data.forEach((etatProjet) => {
            if (!this.listLibellesEtatsProjet.includes(etatProjet.libelle)) {
              this.listLibellesEtatsProjet.push(etatProjet.libelle);
            }
          });
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('etatProjetRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé d\'état de projet') {
      this.etatProjetService.findByLibelle(recherche!).subscribe(
        data => {
          this.listEtatsProjet = [];
          this.listEtatsProjet.push(data);
        }
      )
    }

  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('etatProjetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.etatProjetService.findAll().subscribe(data => {
      this.listEtatsProjet = data;
    })
  }

}
