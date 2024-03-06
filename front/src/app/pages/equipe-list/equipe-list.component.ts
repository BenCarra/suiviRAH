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
    
    this.equipeService.findAll().subscribe(
      data => {
        this.listEquipes = data;
      })
    this.formFiltrage.get('equipeRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }


  onDeleteEquipe(id: string) {
    if (confirm("Voulez-vous vraiment supprimer cette équipe ?")) {
      this.equipeService.delete(id).subscribe({
        next: (response) => {
          alert("Equipe " + response.libelle + " supprimée");
          if (this.listEquipes.length == 1) {
            this.listEquipes = [];
          } else {
            this.equipeService.findAll().subscribe(data => {
              console.log(data);
              this.listEquipes = data;
            })
          }
        },
        error: (error) => {
          console.log("Erreur lors de la suppression de l'équipe", error);
        }
      });
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
