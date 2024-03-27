import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Projet } from '../../../shared/model/projet';
import { Composition } from '../../../shared/model/composition';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { Client } from '../../../shared/model/client';
import { TypeProjet } from '../../../shared/model/type-projet';
import { TypeDefaut } from '../../../shared/model/type-defaut';
import { RDS } from '../../../shared/model/rds';
import { EtatProjet } from '../../../shared/model/etat-projet';
import { ProjetService } from '../../../shared/service/projet.service';
import { ClientService } from '../../../shared/service/client.service';
import { Router } from '@angular/router';
import { TypeProjetService } from '../../../shared/service/type-projet.service';
import { TypeDefautService } from '../../../shared/service/type-defaut.service';
import { EtatProjetService } from '../../../shared/service/etat-projet.service';
import { RDSService } from '../../../shared/service/rds.service';
import { CompositionService } from '../../../shared/service/composition.service';

@Component({
  selector: 'app-form-create-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './form-create-projet.component.html',
  styleUrl: './form-create-projet.component.css'
})
export class FormCreateProjetComponent {

  formCreate!: FormGroup;
  projetCree: Projet = new Projet();
  clients: Client[] = [];
  typesProjet!: TypeProjet[];
  typesDefaut!: TypeDefaut[];
  etats!: EtatProjet[];
  rds!: RDS[];
  compositions!: number[][];

  constructor(private projetService: ProjetService, private clientService: ClientService, private typeProjetService: TypeProjetService, private typeDefautService: TypeDefautService, private etatProjetService: EtatProjetService, private rdsService: RDSService, private compositionService: CompositionService, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      nom: new FormControl('', Validators.required),
      jira: new FormControl('', Validators.required),
      techno: new FormControl('', Validators.required),
      dateDemande: new FormControl('', Validators.required),
      livraisonSouhaitee: new FormControl('', Validators.required),
      livraisonRevisee: new FormControl('', Validators.required),
      affectationCDS: new FormControl('', Validators.required),
      priseEnCompteCDS: new FormControl('', Validators.required),
      dateEstimation: new FormControl('', Validators.required),
      devisEstimation: new FormControl('', Validators.required),
      dontGarantie: new FormControl('', Validators.required),
      dateFeuVert: new FormControl('', Validators.required),
      dateLivraison: new FormControl('', Validators.required),
      mco: new FormControl('', Validators.required),
      datePassageMCO: new FormControl(''),
      dateSortieMCO: new FormControl(''),
      commentaires: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      typeProjet: new FormControl('', Validators.required),
      typeDefaut: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
      rds: new FormControl(null),
      compositions: new FormControl('', Validators.required)
    })

    // Récupération des clients actifs
    this.clientService.findAll().subscribe(data => {
      data.forEach(client => {
        if (client.actif) {
          this.clients.push(client);
        }
      })
    })

    // Récupération des types de projet
    this.typeProjetService.findAll().subscribe(data => {
      this.typesProjet = data;
    })

    // Récupération des types de service
    this.typeDefautService.findAll().subscribe(data => {
      this.typesDefaut = data;
    })

    // Récupération des états de projet
    this.etatProjetService.findAll().subscribe(data => {
      this.etats = data;
    })

    // Récupération des rds
    this.rdsService.findAll().subscribe(data => {
      this.rds = data;
    })

    // Récupération des compositions pour l'affectation d'une ou plusieurs compositions à un projet
    this.compositionService.findAll().subscribe(
      data => {
        this.compositions = [];
        data.forEach(composition => {
          let compositionObject: number[] = [];
          compositionObject.push(composition.idComposition);
          compositionObject.push(composition.idEquipe);
          compositionObject.push(composition.idUtilisateur);
          this.compositions.push(compositionObject);
        })
      }
    )

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/projets");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['nom'].hasError('required') ||
    this.formCreate.controls['jira'].hasError('required') ||
    this.formCreate.controls['techno'].hasError('required') ||
    this.formCreate.controls['dateDemande'].hasError('required') ||
    this.formCreate.controls['livraisonSouhaitee'].hasError('required') ||
    this.formCreate.controls['livraisonRevisee'].hasError('required') ||
    this.formCreate.controls['affectationCDS'].hasError('required') ||
    this.formCreate.controls['priseEnCompteCDS'].hasError('required') ||
    this.formCreate.controls['dateEstimation'].hasError('required') ||
    this.formCreate.controls['devisEstimation'].hasError('required') ||
    this.formCreate.controls['dontGarantie'].hasError('required') ||
    this.formCreate.controls['dateFeuVert'].hasError('required') ||
    this.formCreate.controls['dateLivraison'].hasError('required') ||
    this.formCreate.controls['mco'].hasError('required') ||
    this.formCreate.controls['commentaires'].hasError('required') ||
    this.formCreate.controls['client'].hasError('required') ||
    this.formCreate.controls['typeProjet'].hasError('required') ||
    this.formCreate.controls['typeDefaut'].hasError('required') ||
    this.formCreate.controls['etat'].hasError('required') ||
    this.formCreate.controls['compositions'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.projetCree.nomProjet = this.formCreate.get("nom")?.value;
      this.projetCree.jira = this.formCreate.get("jira")?.value;
      this.projetCree.techno = this.formCreate.get("techno")?.value;
      this.projetCree.dateDemande = this.formCreate.get("dateDemande")?.value;
      this.projetCree.livraisonSouhaitee = this.formCreate.get("livraisonSouhaitee")?.value;
      this.projetCree.livraisonRevisee = this.formCreate.get("livraisonRevisee")?.value;
      this.projetCree.affectationCDS = this.formCreate.get("affectationCDS")?.value;
      this.projetCree.priseEnCompteCDS = this.formCreate.get("priseEnCompteCDS")?.value;
      this.projetCree.dateEstimation = this.formCreate.get("dateEstimation")?.value;
      this.projetCree.devisEstimation = this.formCreate.get("devisEstimation")?.value;
      this.projetCree.dontGarantie = this.formCreate.get("dontGarantie")?.value;
      this.projetCree.dateFeuVert = this.formCreate.get("dateFeuVert")?.value;
      this.projetCree.dateLivraison = this.formCreate.get("dateLivraison")?.value;
      this.projetCree.mco = this.formCreate.controls['mco'].value; // ici, j'utilise controls pour mettre un boolean au lieu d'une string et ainsi permettre le changement dans la base de données

      if (this.projetCree.mco == true) {
        this.projetCree.datePassageMCO = this.formCreate.get("datePassageMCO")?.value;
        this.projetCree.dateSortieMCO = this.formCreate.get("dateSortieMCO")?.value;
      } else {
        this.projetCree.datePassageMCO = null;
        this.projetCree.dateSortieMCO = null;
      }

      this.projetCree.commentaires = this.formCreate.get("commentaires")?.value;
      this.projetCree.nomClient = this.formCreate.get("client")?.value;
      this.projetCree.libelleTypeProjet = this.formCreate.get("typeProjet")?.value;

      if (this.formCreate.get("typeDefaut")?.value != "Aucun") {
        this.projetCree.libelleTypeDefaut = this.formCreate.get("typeDefaut")?.value;
      } else {
        this.projetCree.libelleTypeDefaut = "";
      }

      this.projetCree.libelleEtat = this.formCreate.get("etat")?.value;

      if (this.projetCree.nomClient == "Toto") {
        this.projetCree.rds = this.formCreate.get("rds")?.value;
      } else {
        this.projetCree.rds = null;
      }

      this.projetCree.listCompositions = this.formCreate.get("compositions")?.value;

      console.log(this.projetCree);

      this.projetService.create(this.projetCree).subscribe({
        next: (response) => {
          alert('Projet ' + response.nomProjet + ' créé!');
          this.router.navigateByUrl("/projets");
        },
        error: (error) => {
          console.error('Erreur lors de la création du projet', error);
        }
      });
    }

  }

}
