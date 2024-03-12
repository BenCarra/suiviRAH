import { Component } from '@angular/core';
import { TypeUtilisateur } from '../../shared/model/type-utilisateur';
import { TypeUtilisateurService } from '../../shared/service/type-utilisateur.service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-utilisateur-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './type-utilisateur-list.component.html',
  styleUrl: './type-utilisateur-list.component.css'
})
export class TypeUtilisateurListComponent {

  listTypesUtilisateur!: TypeUtilisateur[];
  listLibellesTypesUtilisateur: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private typeUtilisateurService: TypeUtilisateurService) {

  }

  ngOnInit() {

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeUtilisateurRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les types utilisateur à afficher
    this.typeUtilisateurService.findAll().subscribe(data => {
      this.listTypesUtilisateur = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('typeUtilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des types utilisateur
  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('typeUtilisateurRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques type utilisateur correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type utilisateur') {
        this.listLibellesTypesUtilisateur = [];
        this.typeUtilisateurService.findAll().subscribe(data => {
          data.forEach((typeUtilisateur) => {
            if (!this.listLibellesTypesUtilisateur.includes(typeUtilisateur.libelle)) {
              this.listLibellesTypesUtilisateur.push(typeUtilisateur.libelle);
            }
          });
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('typeUtilisateurRecherche')?.value;

    // Selon le filtre choisi, on récupère les résultats

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type utilisateur') {
      this.typeUtilisateurService.findByLibelle(recherche!).subscribe(
        data => {
          this.listTypesUtilisateur = [];
          this.listTypesUtilisateur.push(data);
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('typeUtilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeUtilisateurService.findAll().subscribe(data => {
      this.listTypesUtilisateur = data;
    })
  }

}
