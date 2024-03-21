import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RDS } from '../../shared/model/rds';
import { RDSService } from '../../shared/service/rds.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rds-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './rds-list.component.html',
  styleUrl: './rds-list.component.css'
})
export class RdsListComponent {

  formFiltrage!: FormGroup;
  listNomsRDS!: string[];
  listRDS!: RDS[];

  constructor(private rdsService: RDSService){
    
  }

  ngOnInit(){

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      rdsRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les rds à afficher
    this.rdsService.findAll().subscribe(data => {
      this.listRDS = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('rdsRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des rds
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('rdsRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques rds correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par nom de rds') {
        this.listNomsRDS = [];
        this.rdsService.findAll().subscribe(data => {
          data.forEach((rds) => {
            if (!this.listNomsRDS.includes(rds.nom)) {
              this.listNomsRDS.push(rds.nom);
            }
          });
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
    let recherche = this.formFiltrage.get('rdsRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par nom de rds') {
      this.rdsService.findByNom(recherche!).subscribe(
        data => {
          this.listRDS = data;
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('rdsRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.rdsService.findAll().subscribe(data => {
      this.listRDS = data;
    })
  }

}
