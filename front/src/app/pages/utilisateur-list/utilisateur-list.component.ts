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
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; utilisateurRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; boutonReset: FormControl<string | null>; }>;


  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      utilisateurRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.utilisateurService.findAll().subscribe(data => {
      this.listUtilisateurs = data;
    })
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
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
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('utilisateurRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

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

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('utilisateurRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'utilisateur') {
      this.utilisateurService.findByNom(recherche!).subscribe(
        data => {
          this.listUtilisateurs = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par type d\'utilisateur'){
      this.utilisateurService.findByTypeUtilisateur(recherche!).subscribe(
        data => {
          this.listUtilisateurs = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site'){
      this.utilisateurService.findBySite(recherche!).subscribe(
        data => {
          this.listUtilisateurs = data;
        }
      )
    }
    
  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.listUtilisateurs = [];
    this.utilisateurService.findAll().subscribe((data) => {
      (data.forEach((utilisateur) => {
        this.listUtilisateurs.push(utilisateur);
      }
      ));
    });
  }
}
