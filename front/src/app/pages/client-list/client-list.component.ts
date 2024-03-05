import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../shared/service/client.service';
import { Router, RouterLink } from '@angular/router';
import { Client } from '../../shared/model/client';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  routerURL: string;
  idClient!: string;
  listClients!: Client[];
  listNomsClient: String[] = [];
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; clientRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; boutonReset: FormControl<string | null>; }>;


  constructor(private clientService: ClientService, private router: Router) {
    this.routerURL = router.url;
  }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      clientRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.clientService.findAll().subscribe(data => {
      this.listClients = data;
    })
    this.formFiltrage.get('clientRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('clientRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par nom de client') {
        this.listNomsClient = [];
        this.clientService.findAll().subscribe(data => {
          data.forEach((client) => {
            if (!this.listNomsClient.includes(client.nomClient)) {
              this.listNomsClient.push(client.nomClient);
            }
          });
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('clientRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par nom de client') {
      this.clientService.findByNom(recherche!).subscribe(
        data => {
          this.listClients = data;
        }
      )
    }

  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('clientRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.clientService.findAll().subscribe(data => {
      this.listClients = data;
    })
  }
}
