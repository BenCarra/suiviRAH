import { Component } from '@angular/core';
import { Equipe } from '../../shared/model/equipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EquipeService } from '../../shared/service/equipe.service';

@Component({
  selector: 'app-equipe-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './equipe-list.component.html',
  styleUrl: './equipe-list.component.css'
})
export class EquipeListComponent {
  routerURL: string;
  listEquipes!: Equipe[];
  listLibellesEquipe: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private equipeService: EquipeService, private router: Router) {
    this.routerURL = router.url;
  }

  ngOnInit() {

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      equipeRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    
    // Récupération de toutes les équipes à afficher
    this.equipeService.findAll().subscribe(
      data => {
        this.listEquipes = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('equipeRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour supprimer une équipe
  onDeleteEquipe(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette équipe ?")) {
      this.equipeService.delete(id).subscribe({
        next: (response) => {
          alert("Equipe " + response.libelle + " supprimée");
          if (this.listEquipes.length == 1) { // Si on supprime la seule équipe restante
            this.listEquipes = [];
          } else { 
            this.equipeService.findAll().subscribe(data => {
              this.listEquipes = data;
            })
          }
        },
        error: (error) => { // Si erreur
          console.log("Erreur lors de la suppression de l'équipe", error);
        }
      });
    }
  }

  // Méthode pour le filtrage des états de projet
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('equipeRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques état projet correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé d\'équipe') {
        this.listLibellesEquipe = [];
        this.equipeService.findAll().subscribe(data => {
          data.forEach((equipe) => {
            if (!this.listLibellesEquipe.includes(equipe.libelle)) {
              this.listLibellesEquipe.push(equipe.libelle);
            }
          });
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
    let recherche = this.formFiltrage.get('equipeRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé d\'équipe') {
      this.listEquipes = [];
      this.equipeService.findByLibelle(recherche!).subscribe(
        data => {
          this.listEquipes.push(data);
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('equipeRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.equipeService.findAll().subscribe(data => {
      this.listEquipes = data;
    })
  }

}
