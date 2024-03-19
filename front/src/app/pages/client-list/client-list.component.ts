import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../shared/service/client.service';
import { Router, RouterLink } from '@angular/router';
import { Client } from '../../shared/model/client';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  routerURL: string;
  idClient!: string;
  listClients!: Client[];
  listNomsClient: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private clientService: ClientService, private router: Router) {
    this.routerURL = router.url;
  }

  ngOnInit() {

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      clientRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les clients à afficher
    this.clientService.findAll().subscribe(data => {
      this.listClients = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('clientRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des états de projet
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('clientRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques état projet correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par nom de client') {
        this.listNomsClient = [];
        this.clientService.findAll().subscribe(data => {
          data.forEach((client) => {
            if (!this.listNomsClient.includes(client.nomClient)) {
              this.listNomsClient.push(client.nomClient);
            }
          });
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
    let recherche = this.formFiltrage.get('clientRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par nom de client') {
      this.clientService.findByNom(recherche!).subscribe(
        data => {
          this.listClients = data;
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('clientRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.clientService.findAll().subscribe(data => {
      this.listClients = data;
    })
  }
}
