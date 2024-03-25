import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../../shared/model/utilisateur';
import { UtilisateurService } from '../../shared/service/utilisateur.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.scss',
  imports: [DatePipe, RouterLink, ReactiveFormsModule]
})
export class UtilisateurListComponent {

  routerURL: string;
  listUtilisateurs!: Utilisateur[];
  listNomsUtilisateur: String[] = [];
  listTypesUtilisateur: String[] = [];
  listSitesUtilisateur: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private utilisateurService: UtilisateurService, private router: Router) {
    this.routerURL = router.url; // pour déterminer le rendu HTML selon la route
  }

  ngOnInit() {

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      utilisateurRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les utilisateurs à afficher
    this.utilisateurService.findAll().subscribe(data => {
      this.listUtilisateurs = data;
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des utilisateurs
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('utilisateurRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques utilisateur correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'utilisateur') {
        this.listNomsUtilisateur = [];
        this.utilisateurService.findAll().subscribe(data => {
          data.forEach((utilisateur) => {
            if (!this.listNomsUtilisateur.includes(utilisateur.nomUtilisateur)) {
              this.listNomsUtilisateur.push(utilisateur.nomUtilisateur);
            }
          });
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par type d\'utilisateur') {
        this.listTypesUtilisateur = [];
        this.utilisateurService.findAll().subscribe(data => {
          data.forEach((utilisateur) => {
            if (!this.listTypesUtilisateur.includes(utilisateur.libelleTypeUtilisateur)) {
              this.listTypesUtilisateur.push(utilisateur.libelleTypeUtilisateur);
            }
          })
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
        this.listSitesUtilisateur = [];
        this.utilisateurService.findAll().subscribe(data => {
          (data.forEach((utilisateur) => {
            if (!this.listSitesUtilisateur.includes(utilisateur.nomSite)) {
              this.listSitesUtilisateur.push(utilisateur.nomSite);
            }
          }
          ));
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
    let recherche = this.formFiltrage.get('utilisateurRecherche')?.value;

    // Selon le filtre choisi, on récupère les résultats

    if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'utilisateur') {
      this.utilisateurService.findByNom(recherche!).subscribe(
        data => {
          this.listUtilisateurs = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par type d\'utilisateur') {
      this.utilisateurService.findByTypeUtilisateur(recherche!).subscribe(
        data => {
          this.listUtilisateurs = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
      this.utilisateurService.findBySite(recherche!).subscribe(
        data => {
          this.listUtilisateurs = data;
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.utilisateurService.findAll().subscribe(data => {
      this.listUtilisateurs = data;
    })
  }
}
