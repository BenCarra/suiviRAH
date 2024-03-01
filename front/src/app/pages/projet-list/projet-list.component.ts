import { Component } from '@angular/core';
import { ProjetService } from '../../shared/service/projet.service';
import { Projet } from '../../shared/model/projet';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-projet-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './projet-list.component.html',
  styleUrl: './projet-list.component.scss'
})
export class ProjetListComponent {

  routerURL: string;
  valeurParDefautList: string = "Filtrer";
  listNomsProjet: String[] = [];
  listProjets!: Projet[];
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; projetRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; }>;
  idProjet!: string;

  constructor(private projetService: ProjetService, router: Router) {
    this.routerURL = router.url;
  }

  ngOnInit() {
    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      projetRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required)
    });
    this.projetService.findAll().subscribe(data => {
      //console.log(data);
      this.listProjets = data;
    })
    this.formFiltrage.get('projetRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
  }

  onDeleteProjet(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if(e.target.parentElement?.parentElement?.id){
        this.idProjet = e.target.parentElement?.parentElement?.id;
      }
      //console.log(this.idProjet);
      if(confirm("Voulez-vous vraiment supprimer ce projet ?")){
        // Régler les problèmes de contraintes d'intégrité pour la base de données
        this.projetService.deleteById(this.idProjet).subscribe();
        window.location.reload();
      }
      
    }
  }
  onDuplicateProjet() {
    throw new Error('Method not implemented.');
  }
  onUpdateProjet() {
    throw new Error('Method not implemented.');
  }

  updateFiltrage() {
    //console.log(this.formFiltrage.value.filtrageDemande);
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.listNomsProjet = [];

      this.formFiltrage.get('projetRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par nom de projet') {
        console.log("Recherche par nom de projet");
        this.projetService.findAll().subscribe((data) => {
          (data.forEach((projet) => {
            console.log(projet.nomProjet);
            this.listNomsProjet.push(projet.nomProjet);
            console.log(this.listNomsProjet);
          }
          ));
        });

      } else if (this.formFiltrage.value.filtrageDemande == 'Par type de projet') {
        console.log("Recherche par type de projet");
      } else if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'équipe') {
        console.log("Recherche par nom d'équipe");
      } else if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'utilisateur') {
        console.log("Recherche par nom d'utilisateur");
      } else {
        this.formFiltrage.get('projetRecherche')?.disable();
        this.formFiltrage.get('boutonSoumission')?.disable();
        console.log("Sélectionner un filtre");
      }
    }
  }

  onInputChange() {
    console.log(this.formFiltrage.get('projetRecherche')?.value);
    /*if (this.listNomsProjet.includes(this.formFiltrage.get('projetRecherche')?.value)){
      
    }*/

  }

}