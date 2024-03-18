import { Component } from '@angular/core';
import { ProjetService } from '../../shared/service/projet.service';
import { SuiviProjet } from '../../shared/model/suivi-projet';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TacheService } from '../../shared/service/tache.service';

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
  listSuiviProjetsByClient!: SuiviProjet[];
  listSuiviProjetsByAnnee!: SuiviProjet[];
  listNomsClient!: string[];
  anneeActuelle!: number;
  listAnneesTaches: any[] = [];

  constructor(private projetService: ProjetService, private tacheService: TacheService) {

  }

  ngOnInit() {

    // Récupération de l'année courante
    this.anneeActuelle = new Date().getFullYear();

    // Création de la liste des années pour le tableau de suivi des projets 
    this.tacheService.getListAnneesTaches().subscribe(data => {
      this.listAnneesTaches = data;
      this.listAnneesTaches.push("Total"); // Pour le cas d'affichage de la durée totale pour un suivi projet
    })

    // Création du formulaire réactif
    this.formFiltrage = new FormGroup({
      clientRecherche: new FormControl('', Validators.required),
      projetTermine: new FormControl('', Validators.required)
    }),

    // Récupération du suivi des projets
    this.projetService.getSuiviProjets().subscribe(data => {
      this.listSuiviProjets = data;
      this.listNomsClient = [];
      // Extraction des noms des clients pour le filtre
      data.forEach((suiviProjet) => {
        if (!this.listNomsClient.includes(suiviProjet.nomClient)) {
          this.listNomsClient.push(suiviProjet.nomClient);
        }
      });
      this.onLoadTable(this.listSuiviProjets);
    });

    // Récupération du suivi des projets par client
    //this.projetService.getSuiviProjetsByClient(this.nomClient)
  }

  // Chargement de la table du suivi des projets
  onLoadTable(data: SuiviProjet[]){
    let tableauElement = document.getElementById("table-body-suivi-projets");
    if (tableauElement != null) {
      // Variable stockant le suivi de projet parcouru, sachant que listSuiviProjets peut avoir des éléments ayant le même nom de projet
      let nomSuiviProjetActuel = "";
      // Variable stockant le nom du client du suivi de projet parcouru, sachant que listSuiviProjets peut avoir des éléments ayant le même nom de client
      let nomClientSuiviProjetActuel = "";
      // Code HTML rajouté pour une ligne du tableau
      let index = "";
      // Compteur de <td> afin de gérer le cas où une cellule d'une année n'est pas remplie
      let nbtd = 0;
      // Variable servant pour le code HTML des lignes à ajouter du tableau
      let tableauHTML = "";
      data.forEach(suiviProjet => {
        // Si le nom du projet suivi est différent du précédent
        if (suiviProjet.nomProjet != nomSuiviProjetActuel || suiviProjet.nomClient != nomClientSuiviProjetActuel) {
          // Si le nom du projet suivi actuel n'est pas vide, on termine la ligne du tableau
          if (nomSuiviProjetActuel != "" || nomClientSuiviProjetActuel != "") {
            tableauHTML += `${index}</tr> `;
          }
          tableauHTML += `<tr title=${suiviProjet.idProjet} style="background-color: white;">`;
          tableauHTML += `<td style="border: 1px solid black;
          text-align: left;
          padding: 8px;" >${suiviProjet.nomClient}</td>`;
          tableauHTML += `<td style="border: 1px solid black;
          text-align: left;
          padding: 8px;">${suiviProjet.nomProjet}</td>`;
          tableauHTML += `<td style="border: 1px solid black;
          text-align: left;
          padding: 8px;">${suiviProjet.devisEstimation}</td>`;
          tableauHTML += `<td style="border: 1px solid black;
          text-align: left;
          padding: 8px;">${suiviProjet.libelleEtat}</td>`;
          nomSuiviProjetActuel = suiviProjet.nomProjet;
          nomClientSuiviProjetActuel = suiviProjet.nomClient;
          index = "";
          nbtd = 0;
        }

        // Selon l'année de tâche récupérée, on remplit ou non les cellules de la ligne correspondante
        switch (suiviProjet.anneeTache) {
          case this.listAnneesTaches[0]:
            index = `<td style="border: 1px solid black;
            text-align: left;
            padding: 8px;">${suiviProjet.dureeTache}</td>`;
            nbtd = 1;
            break;
          case this.listAnneesTaches[1]:
            if (nbtd < 1) {
              index += `<td style="border: 1px solid black;
              text-align: left;
              padding: 8px;"></td>`;
            }
            index += `<td  >${suiviProjet.dureeTache}</td>`;
            nbtd = 2;
            break;
          case this.listAnneesTaches[2]:
            if (nbtd < 2) {
              for (let i = nbtd; i < 2; i++) {
                index += `<td style="border: 1px solid black;
                text-align: left;
                padding: 8px;"></td>`;
              }
            }
            index += `<td style="border: 1px solid black;
            text-align: left;
            padding: 8px;">${suiviProjet.dureeTache}</td>`;
            nbtd = 3;
            break;
          case this.listAnneesTaches[3]:
            if (nbtd < 3) {
              for (let i = nbtd; i < 3; i++) {
                index += `<td style="border: 1px solid black;
                text-align: left;
                padding: 8px;"></td>`;
              }
            }
            index += `<td  style="border: 1px solid black;
            text-align: left;
            padding: 8px;">${suiviProjet.dureeTache}</td>`;
            nbtd = 4;
            break;
          default: // Cas "Total"
            if (nbtd < 4) {
              for (let i = nbtd; i < 4; i++) {
                index += `<td style="border: 1px solid black;
                text-align: left;
                padding: 8px;"></td>`;
              }
            }
            index += `<td  style="border: 1px solid black;
            text-align: left;
            padding: 8px;">${suiviProjet.dureeTache}</td>`;
            nbtd = 5;
            break;
        }
      })
      tableauHTML += index;
      tableauHTML += "</tr> "

      tableauElement.innerHTML = tableauHTML;

    }
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
        this.onLoadTable(this.listSuiviProjets);
      });
    } else {
      this.projetService.getSuiviProjetsByClient(clientRecherche).subscribe(data => {
        this.listSuiviProjets = [];
        data.forEach(suiviProjet => {
          this.listSuiviProjets.push(suiviProjet);
        });
        this.onLoadTable(this.listSuiviProjets);
      });
    }
  }

  // Méthode exécutée quand on (dé)coche la case
  onCheck(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      let temp: SuiviProjet[] = [];
      // Si case cochée, affichage des projets terminés
      if (e.target.checked) {
        this.listSuiviProjets.forEach(suiviProjet => {
          if (suiviProjet.libelleEtat == "terminé") {
            temp.push(suiviProjet);
          }
          this.listSuiviProjets = temp;
          this.onLoadTable(this.listSuiviProjets)
        })
      }
      // Sinon, on remet le suivi des projets d'origine en fonction du (ou des) client(s) sélectionné(s) 
      else {
        this.onSearch();
      }
    }

  }
}
