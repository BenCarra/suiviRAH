import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Projet } from '../../../shared/model/projet';
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
import { EquipeService } from '../../../shared/service/equipe.service';
import { Equipe } from '../../../shared/model/equipe';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-form-create-projet',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    TextFieldModule],
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
  equipes!: Equipe[];

  constructor(private projetService: ProjetService, private clientService: ClientService, private typeProjetService: TypeProjetService, private typeDefautService: TypeDefautService, private etatProjetService: EtatProjetService, private rdsService: RDSService, private equipeService: EquipeService, private router: Router) { }

  ngOnInit() {
    // Création du formulaire réactif
    this.formCreate = new FormGroup({
      nom: new FormControl('', Validators.required),
      jira: new FormControl('', Validators.required),
      techno: new FormControl(''),
      dateDemande: new FormControl('', Validators.required),
      livraisonSouhaitee: new FormControl(''),
      livraisonRevisee: new FormControl(''),
      affectationCDS: new FormControl(''),
      priseEnCompteCDS: new FormControl(''),
      dateEstimation: new FormControl(''),
      devisEstimation: new FormControl('', Validators.required),
      dontGarantie: new FormControl('', Validators.required),
      dateFeuVert: new FormControl(''),
      dateLivraison: new FormControl(''),
      datePassageMCO: new FormControl(''),
      dateSortieMCO: new FormControl(''),
      commentaires: new FormControl(''),
      client: new FormControl('', Validators.required),
      typeProjet: new FormControl('', Validators.required),
      typeDefaut: new FormControl(''),
      etat: new FormControl('', Validators.required),
      rds: new FormControl(null, Validators.required),
      equipes: new FormControl(''),
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

    // Récupération des équipes
    this.equipeService.findAll().subscribe(data => {
      this.equipes = data;
    })

    // Affichage ou non du champ RDS selon le nom du client
    this.onClientSelectionChange();

    // Par défaut, l'état du projet est à "nouveau"
    this.formCreate.get('etat')?.setValue("Nouveau");

  }

  // Méthode exécutée quand on change la valeur du champ client
  onClientSelectionChange() {

    if (this.formCreate.get('client')?.value == "CALEF") {
      this.formCreate.get('rds')?.enable();
    } else{
      this.formCreate.get('rds')?.disable();
    } 
    

    if (this.formCreate.get('client')?.value == "MSA"){
      this.formCreate.get('jira')?.enable();
      this.formCreate.get('devisEstimation')?.enable();
      this.formCreate.get('dontGarantie')?.enable();
    } else {
      this.formCreate.get('jira')?.disable();
      this.formCreate.get('devisEstimation')?.disable();
      this.formCreate.get('dontGarantie')?.disable();
    }

  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/projets");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formCreate.controls['nom'].hasError('required') ||
      this.formCreate.controls['jira'].hasError('required') ||
      this.formCreate.controls['dateDemande'].hasError('required') ||
      this.formCreate.controls['devisEstimation'].hasError('required') ||
      this.formCreate.controls['dontGarantie'].hasError('required') ||
      this.formCreate.controls['client'].hasError('required') ||
      this.formCreate.controls['typeProjet'].hasError('required') ||
      this.formCreate.controls['etat'].hasError('required') ||
      this.formCreate.controls['rds'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.projetCree.nomProjet = this.formCreate.get("nom")?.value;
      this.projetCree.techno = this.formCreate.get("techno")?.value;
      this.projetCree.dateDemande = this.formCreate.get("dateDemande")?.value;
      this.projetCree.livraisonSouhaitee = this.formCreate.get("livraisonSouhaitee")?.value;
      this.projetCree.livraisonRevisee = this.formCreate.get("livraisonRevisee")?.value;
      this.projetCree.affectationCDS = this.formCreate.get("affectationCDS")?.value;
      this.projetCree.priseEnCompteCDS = this.formCreate.get("priseEnCompteCDS")?.value;
      this.projetCree.dateEstimation = this.formCreate.get("dateEstimation")?.value;
      this.projetCree.dateFeuVert = this.formCreate.get("dateFeuVert")?.value;
      this.projetCree.dateLivraison = this.formCreate.get("dateLivraison")?.value;

      // mco est défini à true quand seule la date de passage est donnée, sinon mco est défini à false
      if ((this.projetCree.datePassageMCO && this.projetCree.dateSortieMCO) || (!this.projetCree.datePassageMCO && !this.projetCree.dateSortieMCO)) {
        this.projetCree.mco = false;
      } else if (this.projetCree.datePassageMCO && !this.projetCree.dateSortieMCO){
        this.projetCree.mco = true;
      }

      this.projetCree.commentaires = this.formCreate.get("commentaires")?.value;
      this.projetCree.nomClient = this.formCreate.get("client")?.value;
      this.projetCree.libelleTypeProjet = this.formCreate.get("typeProjet")?.value;
      this.projetCree.libelleTypeDefaut = this.formCreate.get("typeDefaut")?.value;
      this.projetCree.libelleEtat = this.formCreate.get("etat")?.value;

      if (this.projetCree.nomClient == "CALEF") {
        this.projetCree.rds = this.formCreate.get("rds")?.value;
      } else {
        this.projetCree.rds = null;
      }

      if (this.projetCree.nomClient == "MSA") {
        this.projetCree.jira = this.formCreate.get("jira")?.value;
        this.projetCree.devisEstimation = this.formCreate.get("devisEstimation")?.value;
        this.projetCree.dontGarantie = this.formCreate.get('dontGarantie')?.value;
      } else {
        this.projetCree.jira = "";
        this.projetCree.devisEstimation = 0;
        this.projetCree.dontGarantie = 0;
      }

      this.projetCree.libelleEquipe = this.formCreate.get("equipes")?.value;
      
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
