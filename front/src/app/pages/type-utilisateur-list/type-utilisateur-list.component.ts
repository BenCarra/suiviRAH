import { Component } from '@angular/core';
import { TypeUtilisateur } from '../../shared/model/type-utilisateur';
import { TypeUtilisateurService } from '../../shared/service/type-utilisateur.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-utilisateur-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './type-utilisateur-list.component.html',
  styleUrl: './type-utilisateur-list.component.css'
})
export class TypeUtilisateurListComponent {

  routerURL: string;
  idUtilisateur!: string;
  listTypesUtilisateur!: TypeUtilisateur[];
  listLibellesTypesUtilisateur: String[] = [];
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; typeUtilisateurRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; boutonReset: FormControl<string | null>; }>;


  constructor(private typeUtilisateurService: TypeUtilisateurService, private router: Router) {
    this.routerURL = router.url;
  }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeUtilisateurRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.typeUtilisateurService.findAll().subscribe(data => {
      this.listTypesUtilisateur = data;
    })
    this.formFiltrage.get('typeUtilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('typeUtilisateurRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type utilisateur') {
        this.listLibellesTypesUtilisateur = [];
        this.typeUtilisateurService.findAll().subscribe(data => {
          data.forEach((typeUtilisateur) => {
            if (!this.listLibellesTypesUtilisateur.includes(typeUtilisateur.libelle)) {
              this.listLibellesTypesUtilisateur.push(typeUtilisateur.libelle);
            }
          });
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('typeUtilisateurRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type utilisateur') {
      this.typeUtilisateurService.findByLibelle(recherche!).subscribe(
        data => {
          this.listTypesUtilisateur = [];
          this.listTypesUtilisateur.push(data);
        }
      )
    }

  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('utilisateurRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeUtilisateurService.findAll().subscribe(data => {
      this.listTypesUtilisateur = data;
    })
  }

}
