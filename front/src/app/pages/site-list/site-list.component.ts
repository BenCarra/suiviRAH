import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteService } from '../../shared/service/site.service';
import { Site } from '../../shared/model/site';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  formFiltrage!: FormGroup;
  listNomsSite!: string[];
  listSites!: Site[];

  constructor(private siteService: SiteService){

  }

  ngOnInit(){

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      siteRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les sites à afficher
    this.siteService.findAll().subscribe(data => {
      this.listSites = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('siteRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des sites
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('siteRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques site correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
        this.listNomsSite = [];
        this.siteService.findAll().subscribe(data => {
          data.forEach((site) => {
            if (!this.listNomsSite.includes(site.nomSite)) {
              this.listNomsSite.push(site.nomSite);
            }
          });
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('siteRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
      this.siteService.findByNom(recherche!).subscribe(
        data => {
          this.listSites = [];
          this.listSites.push(data);
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('siteRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.siteService.findAll().subscribe(data => {
      this.listSites = data;
    })
  }

}
