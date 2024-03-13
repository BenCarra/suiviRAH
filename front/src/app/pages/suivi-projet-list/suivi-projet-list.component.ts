import { Component } from '@angular/core';
import { ProjetService } from '../../shared/service/projet.service';
import { SuiviProjet } from '../../shared/model/suivi-projet';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-suivi-projet-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './suivi-projet-list.component.html',
  styleUrl: './suivi-projet-list.component.css'
})
export class SuiviProjetListComponent {

  formFiltrage!: FormGroup;
  listSuiviProjets!: SuiviProjet[];
  listNomsClient!: string[];
  isChecked!: boolean;

  constructor(private projetService: ProjetService){

  }

  ngOnInit(){
    // Création du formulaire réactif
    this.formFiltrage = new FormGroup({
      clientRecherche: new FormControl('', Validators.required),
      projetTermine: new FormControl('', Validators.required)
    }),

    // Récupération du suivi des projets
    this.projetService.getSuiviProjets().subscribe(data => {
      this.listSuiviProjets = data;
      this.listNomsClient = [];
      // Extraction des noms ded clientd pour le filtre
      data.forEach((suiviProjet) => {
        if (!this.listNomsClient.includes(suiviProjet.nomClient)) {
          this.listNomsClient.push(suiviProjet.nomClient);
        }
      });
    })
  }

  // Méthode exécutée après sélection d'une option de la liste déroulante
  onSearch() {
    let clientRecherche = this.formFiltrage.controls['clientRecherche'].value;

    // Quand on change de client, on réinitialise la case à cocher à false
    if (this.formFiltrage.controls['projetTermine'].value) {
      this.formFiltrage.controls['projetTermine'].setValue(false);
    }

    if (clientRecherche == "tous" || clientRecherche == "") {
      this.projetService.getSuiviProjets().subscribe(data => {
        this.listSuiviProjets = data;
      });
    } else {
      this.projetService.getSuiviProjetsByClient(clientRecherche).subscribe(data => {
        this.listSuiviProjets = [];
        data.forEach(suiviProjet => {
            this.listSuiviProjets.push(suiviProjet);
        });
      });
    }
  }

  // Méthode exécutée quand on (dé)coche la case
  onCheck(e: Event) {
    console.log(this.listSuiviProjets);
    if (e.target instanceof HTMLInputElement) {
      let temp: SuiviProjet[] = [];
      // Si case cochée, affichage des projets terminés
      if (e.target.checked){
        this.listSuiviProjets.forEach(suiviProjet => {
          if (suiviProjet.libelleEtat == "terminé") {
            temp.push(suiviProjet);
          }
          this.listSuiviProjets = temp;
        })
      }
      // Sinon, on remet le suivi des projets d'origine en fonction du (ou des) client(s) sélectionné(s) 
      else { 
        this.onSearch();
      }
    }
      
  }
}
