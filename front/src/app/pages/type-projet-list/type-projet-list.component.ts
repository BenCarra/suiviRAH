import { Component } from '@angular/core';
import { TypeProjet } from '../../shared/model/type-projet';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeProjetService } from '../../shared/service/type-projet.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-type-projet-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
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

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeProjetRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les types de projet à afficher
    this.typeProjetService.findAll().subscribe(data => {
      this.listTypesProjet = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('typeProjetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des types de projet
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('typeProjetRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques type projet correspondantes

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

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('typeProjetRecherche')?.value;

    // Selon le filtre choisi, on récupère les résultats
    
    if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type projet') {
      this.typeProjetService.findByLibelle(recherche!).subscribe(
        data => {
          this.listTypesProjet = [];
          this.listTypesProjet.push(data);
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('typeProjetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeProjetService.findAll().subscribe(data => {
      this.listTypesProjet = data;
    })
  }

}
