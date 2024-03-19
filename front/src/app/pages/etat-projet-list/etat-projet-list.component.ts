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

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      etatProjetRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les états de projet à afficher
    this.etatProjetService.findAll().subscribe(data => {
      this.listEtatsProjet = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('etatProjetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des états de projet
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('etatProjetRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques état projet correspondantes

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

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
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

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('etatProjetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.etatProjetService.findAll().subscribe(data => {
      this.listEtatsProjet = data;
    })
  }

}
