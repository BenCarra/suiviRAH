import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client
import { UtilisateurService } from '../../shared/service/utilisateur.service';
import { Router } from '@angular/router';
import { FormUpdateUtilisateurComponent } from '../forms/form-update-utilisateur/form-update-utilisateur.component';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  idClient!: string;
  listClients!: Client[];
  listNomsClient: String[] = [];
  listTypesClient: String[] = [];
  listSitesClient: String[] = [];
  formFiltrage!: FormGroup<{ filtrageDemande: FormControl<string | null>; ClientRecherche: FormControl<string | null>; boutonSoumission: FormControl<string | null>; boutonReset: FormControl<string | null>; }>;


  constructor(private ClientService: ClientService, private router: Router) { }

  ngOnInit() {

    this.formFiltrage = new FormGroup({
      filtrageDemande: new FormControl('', Validators.required),
      ClientRecherche: new FormControl('', Validators.required),
      boutonSoumission: new FormControl('OK', Validators.required),
      boutonReset: new FormControl('Reset')
    });
    this.ClientService.findAll().subscribe(data => {
      this.listClients = data;
    })
    this.formFiltrage.get('ClientRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
  }


  onDeleteClient(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.parentElement?.parentElement?.id) {
        this.idClient = e.target.parentElement?.parentElement?.id;
      }
      //console.log(this.idClient);
      if (confirm("Voulez-vous vraiment supprimer cet Client ?")) {
        this.ClientService.deleteById(this.idClient).subscribe();
        alert("Client supprimé")
        // Régler les problèmes de contraintes d'intégrité pour la base de données
        window.location.reload();
      }
    }
  }
  onUpdateClient(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      if (e.target.parentElement?.parentElement?.id) {
        this.idClient = e.target.parentElement?.parentElement?.id;
      }
      this.router.navigateByUrl("/admin/Clients/update/" + this.idClient);
    }
  }

  updateFiltrage() {
    if (this.formFiltrage.value.filtrageDemande != "") {

      this.formFiltrage.get('ClientRecherche')?.enable();
      this.formFiltrage.get('boutonSoumission')?.enable();
      this.formFiltrage.get('boutonReset')?.enable();

      if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'Client') {
        this.listNomsClient = [];
        this.ClientService.findAll().subscribe(data => {
          data.forEach((Client) => {
            if (!this.listNomsClient.includes(Client.nomClient)) {
              this.listNomsClient.push(Client.nomClient);
            }
          });
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par type d\'Client') {
        this.listTypesClient = [];
        this.ClientService.findAll().subscribe(data => {
          data.forEach((Client) => {
            if (!this.listTypesClient.includes(Client.libelleTypeClient)) {
              this.listTypesClient.push(Client.libelleTypeClient);            
            }
          })
        });
      } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site') {
        this.listSitesClient = [];
        this.ClientService.findAll().subscribe(data => {
          (data.forEach((Client) => {
            if (!this.listSitesClient.includes(Client.nomSite)) {
              this.listSitesClient.push(Client.nomSite);       
            }
          }
          ));
        });
      }
    }
  }

  onSearch(e: MouseEvent) {
    let recherche = this.formFiltrage.get('ClientRecherche')?.value;

    if (this.formFiltrage.value.filtrageDemande == 'Par nom d\'Client') {
      this.ClientService.findByNom(recherche!).subscribe(
        data => {
          this.listClients = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par type d\'Client'){
      this.ClientService.findByTypeClient(recherche!).subscribe(
        data => {
          this.listClients = data;
        }
      )
    } else if (this.formFiltrage.value.filtrageDemande == 'Par nom de site'){
      this.ClientService.findBySite(recherche!).subscribe(
        data => {
          this.listClients = data;
        }
      )
    }
    
  }

  onReset($event: MouseEvent) {
    this.formFiltrage.get('filtrageDemande')?.setValue("");
    this.formFiltrage.get('ClientRecherche')?.disable();
    this.formFiltrage.get('boutonSoumission')?.disable();
    this.formFiltrage.get('boutonReset')?.disable();
    this.listClients = [];
    this.ClientService.findAll().subscribe((data) => {
      (data.forEach((Client) => {
        this.listClients.push(Client);
      }
      ));
    });
  }
}
