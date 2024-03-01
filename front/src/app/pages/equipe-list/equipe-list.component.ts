import { Component } from '@angular/core';
import { Equipe } from '../../shared/model/equipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EquipeService } from '../../shared/service/equipe.service';

@Component({
  selector: 'app-equipe-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './equipe-list.component.html',
  styleUrl: './equipe-list.component.css'
})
export class EquipeListComponent {
  routerURL: string;
  idEquipe!: string;
  listEquipes!: Equipe[];
  listLibellesEquipe: String[] = [];
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; equipeRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; boutonReset: FormControl<string | null>; }>;


  constructor(private equipeService: EquipeService, private router: Router) {
    this.routerURL = router.url;
  }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      equipeRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.equipeService.findAll().subscribe(data => {
      this.listEquipes = data;
    })
    this.formFiltrage.get('equipeRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }


  onDeleteEquipe(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.parentElement?.parentElement?.id) {
        this.idEquipe = e.target.parentElement?.parentElement?.id;
      }
      //console.log(this.idEquipe);
      if (confirm("Voulez-vous vraiment supprimer cette équipe ?")) {
        this.equipeService.delete(this.idEquipe).subscribe();
        alert("Equipe supprimée")
        // Régler les problèmes de contraintes d'intégrité pour la base de données
        window.location.reload();
      }
    }
  }
  onUpdateEquipe(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.parentElement?.parentElement?.id) {
        this.idEquipe = e.target.parentElement?.parentElement?.id;
      }
      this.router.navigateByUrl("/admin/equipes/update/" + this.idEquipe);
    }
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('equipeRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé d\'équipe') {
        this.listLibellesEquipe = [];
        this.equipeService.findAll().subscribe(data => {
          data.forEach((equipe) => {
            if (!this.listLibellesEquipe.includes(equipe.libelle)) {
              this.listLibellesEquipe.push(equipe.libelle);
            }
          });
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('equipeRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé d\'équipe') {
      this.equipeService.findByLibelle(recherche!).subscribe(
        data => {
          this.listEquipes = data;
        }
      )
    }

  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('equipeRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.equipeService.findAll().subscribe(data => {
      this.listEquipes = data;
    })
  }

}
