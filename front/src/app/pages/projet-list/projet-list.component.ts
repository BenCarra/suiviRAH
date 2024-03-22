import { Component } from '@angular/core';
import { Projet } from '../../shared/model/projet';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjetService } from '../../shared/service/projet.service';
import { Router, RouterLink } from '@angular/router';
import { EquipeService } from '../../shared/service/equipe.service';
import { UtilisateurService } from '../../shared/service/utilisateur.service';

@Component({
  selector: 'app-projet-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './projet-list.component.html',
  styleUrl: './projet-list.component.css'
})
export class ProjetListComponent {

  routerURL: string;
  listProjets!: Projet[];
  listNomsProjet: String[] = [];
  listCompositions!: number[][];
  texteComposition!: string;
  listEquipes: any = [];
  listUtilisateurs: any = [];
  formFiltrage!: FormGroup;


  constructor(private projetService: ProjetService, private equipeService: EquipeService, private utilisateurService: UtilisateurService, private router: Router) {
    this.routerURL = router.url; // pour déterminer le rendu HTML selon la route
  }

  ngOnInit() {

    // Création du formulaire réactif pour le filtrage
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      projetRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });

    // Récupération de tous les projets à afficher
    this.projetService.getProjets().subscribe(data => {
      data.forEach(projet => {
        if ((projet.listCompositions) && (projet.listCompositions.length != 0)) {
          projet.listCompositions.forEach(composition => {
            this.equipeService.findById(composition[1]).subscribe(equipe => {
              if (!this.listEquipes.includes(equipe.libelle + " |" + equipe.idEquipe + "|")) {
                this.listEquipes.push(equipe.libelle + " |" + equipe.idEquipe + "|");
              }
            });
            this.utilisateurService.findById(composition[2]).subscribe(utilisateur => {
              if (!this.listUtilisateurs.includes(utilisateur.nomUtilisateur + " |" + utilisateur.idUtilisateur + "|")) {
                this.listUtilisateurs.push(utilisateur.nomUtilisateur + " |" + utilisateur.idUtilisateur + "|");
              }
            });
  
          })
        }
        
      })
      this.listProjets = data;      
    })

    // Aucun filtre n'étant sélectionné par défaut, on désactive les boutons et la liste de récupération des éléments trouvés
    this.formFiltrage.get('projetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  // Méthode pour le filtrage des projets
  updateFiltrage() {
    // Quand le filtre est sélectionné
    if (this.formFiltrage.value.filtrageDemande != "") {

      // On réactive les boutons et la liste de récupération des éléments trouvés
      this.formFiltrage.get('projetRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      // Pour un filtre choisi, on remplit la liste des caractéristiques projet correspondantes

      if (this.formFiltrage.value.filtrageDemande == 'Par nom de projet') {
        this.listNomsProjet = [];
        this.projetService.getProjets().subscribe(data => {
          data.forEach((projet) => {
            if (!this.listNomsProjet.includes(projet.nomProjet)) {
              this.listNomsProjet.push(projet.nomProjet);
            }
          });
        });
      } else if ((this.formFiltrage.value.filtrageDemande == 'Par composition') ||
        (this.formFiltrage.value.filtrageDemande == 'Par équipe') ||
        (this.formFiltrage.value.filtrageDemande == 'Par utilisateur')) {
        this.listCompositions = [];
        this.projetService.getProjets().subscribe(data => {
          data.forEach((projet) => {

            if (this.formFiltrage.value.filtrageDemande == 'Par composition') {
              projet.listCompositions.forEach(composition => {
                if (!this.listCompositions.includes(composition)) {
                  this.listCompositions.push(composition);
                }
              });
            } else if (this.formFiltrage.value.filtrageDemande == 'Par équipe') {
              this.listEquipes.forEach((equipe: any) => {
                if (!this.listEquipes.includes(equipe)) {
                  this.listEquipes.push(equipe);
                }
              });
            } else if (this.formFiltrage.value.filtrageDemande == 'Par utilisateur') {
              this.listUtilisateurs.forEach((utilisateur: any[]) => {
                if (!this.listUtilisateurs.includes(utilisateur)) {
                  this.listUtilisateurs.push(utilisateur);
                }
              });
            }


          })
        });
      }
    }
  }

  // Méthode exécutée après appui sur le bouton OK du filtre
  onSearch() {
    let recherche: any = this.formFiltrage.get('projetRecherche')?.value.toString();

    // Selon le filtre choisi, on récupère les résultats

    if (this.formFiltrage.value.filtrageDemande == 'Par nom de projet') {
      this.listProjets = []
      this.projetService.getProjetByNom(recherche!).subscribe(
        data => {
          this.listProjets.push(data);
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par composition') {
      this.projetService.getProjetsByComposition(recherche!).subscribe(
        data => {
          this.listProjets = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par équipe') {
      let idRecherche = recherche.split("|")[1];
      this.projetService.getProjetsByEquipe(idRecherche).subscribe(
        data => {
          this.listProjets = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par utilisateur') {
      let idRecherche = recherche.split("|")[1];
      this.projetService.getProjetsByUtilisateur(idRecherche).subscribe(
        data => {
          this.listProjets = data;
        }
      )
    }

  }

  // Méthode exécutée après appui sur le bouton Reset du filtre
  onReset() {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('projetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.projetService.getProjets().subscribe(data => {
      this.listProjets = data;
    })
  }

}
