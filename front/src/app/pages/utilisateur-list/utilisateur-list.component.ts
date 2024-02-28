import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../../shared/model/utilisateur';
import { UtilisateurService } from '../../shared/service/utilisateur.service';
import { Router } from '@angular/router';
import { FormUpdateUtilisateurComponent } from '../forms/form-update-utilisateur/form-update-utilisateur.component';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.scss',
  imports: [DatePipe,MatInputModule,MatButtonModule,MatSelectModule, ReactiveFormsModule, FormUpdateUtilisateurComponent]
})
export class UtilisateurListComponent {

  idUtilisateur!: string;
  listUtilisateurs!: Utilisateur[];
  listNomsUtilisateur: String[] = [];
  listTypesUtilisateur: String[] = [];
  listSitesUtilisateur: String[] = [];
  listNomsUtilisateurCorrespondants!: String[];
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; utilisateurRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; }>;


  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      utilisateurRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required)
    });
    this.utilisateurService.findAll().subscribe(data => {
      this.listUtilisateurs = data;
    })
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
  }


  onDeleteUtilisateur(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.parentElement?.parentElement?.id) {
        this.idUtilisateur = e.target.parentElement?.parentElement?.id;
      }
      //console.log(this.idUtilisateur);
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        this.utilisateurService.deleteById(this.idUtilisateur).subscribe();
        alert("Utilisateur supprimé")
        // Régler les problèmes de contraintes d'intégrité pour la base de données
        window.location.reload();
      }
    }
  }
  onUpdateUtilisateur(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.parentElement?.parentElement?.id) {
        this.idUtilisateur = e.target.parentElement?.parentElement?.id;
      }
      //console.log(this.idUtilisateur);
      this.router.navigateByUrl("/admin/utilisateurs/update/" + this.idUtilisateur);
    }
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "Sélectionner un filtre") {
      this.listNomsUtilisateur = [];
      this.listTypesUtilisateur = [];
      this.listSitesUtilisateur = [];

      this.formFiltrage.get('utilisateurRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();

      document.getElementById("filtrage-demande")!.children[0].textContent = "Enlever le filtre"; 

      if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'utilisateur') {
        console.log("Recherche par nom d'utilisateur");
        this.utilisateurService.findAll().subscribe((data) => {
          data.forEach((utilisateur) => {
            this.listNomsUtilisateur.push(utilisateur.nomUtilisateur);
          })
          this.listNomsUtilisateurCorrespondants = [];
          let utilisateurRecherche = this.formFiltrage.get("utilisateurRecherche");
          for (const nomUtilisateur of this.listNomsUtilisateur) {
            if (nomUtilisateur.includes(utilisateurRecherche?.value!)) {
              //console.log(nomUtilisateur);
              this.listNomsUtilisateurCorrespondants.push(nomUtilisateur);
            }
          }
          //console.log(this.listNomsUtilisateurCorrespondants)
          document.getElementById("noms-utilisateur-correspondant")!.style.display = "inline-block";
          document.getElementById("noms-utilisateur-correspondant")!.style.visibility = "visible";
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par type d\'utilisateur') {
        console.log("Recherche par type d'utilisateur");
        this.utilisateurService.findAll().subscribe((data) => {
          (data.forEach((utilisateur) => {
            //console.log(utilisateur.libelleTypeUtilisateur);
            this.listTypesUtilisateur.push(utilisateur.libelleTypeUtilisateur);
            //console.log(listTypesUtilisateur);
          }
          ));
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
        console.log("Recherche par nom de site");
        this.utilisateurService.findAll().subscribe((data) => {
          (data.forEach((utilisateur) => {
            //console.log(utilisateur.nomSite);
            this.listSitesUtilisateur.push(utilisateur.nomSite);
            //console.log(listSitesUtilisateur);
          }
          ));
        });
      } else {
        document.getElementById("filtrage-demande")!.children[0].textContent = "Sélectionner un filtre";
        this.formFiltrage.get('utilisateurRecherche')?.disable();
        this.formFiltrage.get('boutonSoumission')?.disable();
        document.getElementById("noms-utilisateur-correspondant")!.style.display = "none";
        document.getElementById("noms-utilisateur-correspondant")!.style.visibility = "hidden";
        this.listUtilisateurs=[];
        this.utilisateurService.findAll().subscribe((data) => {
          (data.forEach((utilisateur) => {
            this.listUtilisateurs.push(utilisateur);
          }
          ));
        });
      }
    }
  }

  onInputChange() {
    //console.log(this.listNomsUtilisateur);
   
    return this.listNomsUtilisateurCorrespondants;

  }

  onSearch(e: MouseEvent) {
    let utilisateurRecherche = this.formFiltrage.get('utilisateurRecherche')?.value;
    console.log(utilisateurRecherche);
    this.utilisateurService.findByNom(utilisateurRecherche!).subscribe(
      data => {
        this.listUtilisateurs = data;
      }
    ) 
  }

}
