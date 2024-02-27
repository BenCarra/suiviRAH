import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../../shared/model/utilisateur';
import { UtilisateurService } from '../../shared/service/utilisateur.service';
import { Router } from '@angular/router';
import { FormUpdateUtilisateurComponent } from '../forms/form-update-utilisateur/form-update-utilisateur.component';
import { TypeUtilisateur } from '../../shared/model/type-utilisateur';
import { Site } from '../../shared/model/site';

@Component({
    selector: 'app-utilisateur-list',
    standalone: true,
    templateUrl: './utilisateur-list.component.html',
    styleUrl: './utilisateur-list.component.scss',
    imports: [ReactiveFormsModule, FormUpdateUtilisateurComponent]
})
export class UtilisateurListComponent {
[x: string]: any;

  valeurParDefautList: string = "Filtrer";
  idUtilisateur!: string ;
  listNomsUtilisateur: String[] = [];
  listUtilisateurs!: Utilisateur[];
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; utilisateurRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; }>;

  constructor(private utilisateurService: UtilisateurService, private router: Router){}

  ngOnInit(){

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      utilisateurRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required)
    });
    this.utilisateurService.findAll().subscribe(data => {
      //console.log(data);
      this.listUtilisateurs = data;
    })
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();

    
  }

  
  onDeleteUtilisateur(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.parentElement?.parentElement?.id){
        this.idUtilisateur = e.target.parentElement?.parentElement?.id;
      }
      //console.log(this.idUtilisateur);
      if(confirm("Voulez-vous vraiment supprimer cet utilisateur ?")){
        this.utilisateurService.deleteById(this.idUtilisateur).subscribe();
        alert("Utilisateur supprimé")
        // Régler les problèmes de contraintes d'intégrité pour la base de données
        window.location.reload();
      }
    }
  }
  onUpdateUtilisateur(e: MouseEvent) {
    if (e.target instanceof HTMLElement){
      if (e.target.parentElement?.parentElement?.id){
        this.idUtilisateur = e.target.parentElement?.parentElement?.id;
      }
      //console.log(this.idUtilisateur);
      this.router.navigateByUrl("/admin/utilisateurs/update/"+this.idUtilisateur);
    }
  }

  onInputChange() {
    throw new Error('Method not implemented.');
  }
  
  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      let listNomsUtilisateur: string[] = [];
      let listTypesUtilisateur: string[] = [];
      let listSitesUtilisateur: string[] = [];

      this.formFiltrage.get('utilisateurRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'utilisateur') {
        console.log("Recherche par nom d'utilisateur");
        this.utilisateurService.findAll().subscribe((data) => {
          (data.forEach((utilisateur) => {
            console.log(utilisateur.nomUtilisateur);
            listNomsUtilisateur.push(utilisateur.nomUtilisateur);
            console.log(listNomsUtilisateur);
          }
          ));
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par type d\'utilisateur') {
        console.log("Recherche par type d'utilisateur");
        this.utilisateurService.findAll().subscribe((data) => {
          (data.forEach((utilisateur) => {
            console.log(utilisateur.libelleTypeUtilisateur);
            listTypesUtilisateur.push(utilisateur.libelleTypeUtilisateur);
            console.log(listTypesUtilisateur);
          }
          ));
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
        console.log("Recherche par nom de site");
        this.utilisateurService.findAll().subscribe((data) => {
          (data.forEach((utilisateur) => {
            console.log(utilisateur.nomSite);
            listSitesUtilisateur.push(utilisateur.nomSite);
            console.log(listSitesUtilisateur);
          }
          ));
        });
      } else {
        this.formFiltrage.get('utilisateurRecherche')?.disable();
        this.formFiltrage.get('boutonSoumission')?.disable();
        console.log("Sélectionner un filtre");
      }
    }
  }

}
