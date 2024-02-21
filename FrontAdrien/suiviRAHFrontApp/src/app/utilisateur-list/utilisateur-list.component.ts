import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../model/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { Router } from '@angular/router';
import { FormUpdateUtilisateurComponent } from '../../forms/form-update-utilisateur/form-update-utilisateur.component';

@Component({
    selector: 'app-utilisateur-list',
    standalone: true,
    templateUrl: './utilisateur-list.component.html',
    styleUrl: './utilisateur-list.component.scss',
    imports: [ReactiveFormsModule, FormUpdateUtilisateurComponent]
})
export class UtilisateurListComponent {

  valeurParDefautList: string = "Filtrer";
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
      const id: string | undefined = e.target.parentElement?.parentElement?.id;
      console.log(id);
      if(confirm("Voulez-vous vraiment supprimer cet utilisateur ?")){
        // Régler les problèmes de contraintes d'intégrité pour la base de données
        this.utilisateurService.deleteById(id).subscribe();
      }
    }
  }
  onUpdateUtilisateur(e: MouseEvent) {
    if (e.target instanceof HTMLElement){
      const id: string | undefined = e.target.parentElement?.parentElement?.id;
      console.log(id);
        let formUpdateUtilisateur: (HTMLElement | null) = document.getElementById('form-update-utilisateur');
        if (formUpdateUtilisateur != null){
          formUpdateUtilisateur.style.display = "block";
        }
      
      //this.router.navigate(['admin','utilisateurs','update',id]);
      // Ajouter fenêtre par dessus la courante pour afficher le formulaire avec les champs pré-remplis
    }
  }

  onInputChange() {
    throw new Error('Method not implemented.');
  }
  
  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      let listNomsUtilisateur: string[] = [];
      let listTypesUtilisateur: number[] = [];
      let listSitesUtilisateur: number[] = [];

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
            console.log(utilisateur.idTypeUtilisateur);
            listTypesUtilisateur.push(utilisateur.idTypeUtilisateur);
            console.log(listTypesUtilisateur);
          }
          ));
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
        console.log("Recherche par nom de site");
        this.utilisateurService.findAll().subscribe((data) => {
          (data.forEach((utilisateur) => {
            console.log(utilisateur.idSite);
            listSitesUtilisateur.push(utilisateur.idSite);
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
