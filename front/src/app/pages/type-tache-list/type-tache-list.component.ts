import { Component } from '@angular/core';
import { TypeTache } from '../../shared/model/type-tache';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeTacheService } from '../../shared/service/type-tache.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-type-tache-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './type-tache-list.component.html',
  styleUrl: './type-tache-list.component.css'
})
export class TypeTacheListComponent {

  listTypesTache!: TypeTache[];
  listLibellesTypesTache: String[] = [];
  formFiltrage!: FormGroup;


  constructor(private typeTacheService: TypeTacheService) {

  }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      typeTacheRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.typeTacheService.findAll().subscribe(data => {
      this.listTypesTache = data;
    })
    this.formFiltrage.get('typeTacheRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('typeTacheRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type tâche') {
        this.listLibellesTypesTache = [];
        this.typeTacheService.findAll().subscribe(data => {
          data.forEach((typeTache) => {
            if (!this.listLibellesTypesTache.includes(typeTache.libelle)) {
              this.listLibellesTypesTache.push(typeTache.libelle);
            }
          });
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('typeTacheRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par libellé de type tâche') {
      this.typeTacheService.findByLibelle(recherche!).subscribe(
        data => {
          this.listTypesTache = [];
          this.listTypesTache.push(data);
        }
      )
    }

  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('typeTacheRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.typeTacheService.findAll().subscribe(data => {
      this.listTypesTache = data;
    })
  }

}
