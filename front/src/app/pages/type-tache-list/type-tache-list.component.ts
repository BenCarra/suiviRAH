import { Component } from '@angular/core';
import { TypeTache } from '../../shared/model/type-tache';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeTacheService } from '../../shared/service/type-tache.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-type-tache-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './type-tache-list.component.html',
  styleUrl: './type-tache-list.component.css'
})
export class TypeTacheListComponent {

  listTypesTache!: TypeTache[];
  listLibellesTypesTache: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private typeTacheService: TypeTacheService) {

  }

  ngOnInit() {

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeTacheRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les types de tâche à afficher
    this.typeTacheService.findAll().subscribe(data => {
      this.listTypesTache = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('typeTacheRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des types de tâche
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('typeTacheRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques type tâche correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type tâche') {
        this.listLibellesTypesTache = [];
        this.typeTacheService.findAll().subscribe(data => {
          data.forEach((typeTache) => {
            if (!this.listLibellesTypesTache.includes(typeTache.libelle)) {
              this.listLibellesTypesTache.push(typeTache.libelle);
            }
          });
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
    let recherche = this.formFiltrage.get('typeTacheRecherche')?.value;

    // Selon le filtre choisi, on récupère les résultats

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type tâche') {
      this.typeTacheService.findByLibelle(recherche!).subscribe(
        data => {
          this.listTypesTache = [];
          this.listTypesTache.push(data);
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('typeTacheRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeTacheService.findAll().subscribe(data => {
      this.listTypesTache = data;
    })
  }

}
