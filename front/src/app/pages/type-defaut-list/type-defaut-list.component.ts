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

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeDefautRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les types de défaut à afficher
    this.typeDefautService.findAll().subscribe(data => {
      this.listTypesDefaut = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('typeDefautRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des types de défaut
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('typeDefautRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques type défaut correspondantes

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

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
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

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('typeDefautRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeDefautService.findAll().subscribe(data => {
      this.listTypesDefaut = data;
    })
  }

}
