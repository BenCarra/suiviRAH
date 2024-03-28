import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../shared/model/client';
import { EtatProjet } from '../../../shared/model/etat-projet';
import { Projet } from '../../../shared/model/projet';
import { RDS } from '../../../shared/model/rds';
import { TypeDefaut } from '../../../shared/model/type-defaut';
import { TypeProjet } from '../../../shared/model/type-projet';
import { ClientService } from '../../../shared/service/client.service';
import { EtatProjetService } from '../../../shared/service/etat-projet.service';
import { ProjetService } from '../../../shared/service/projet.service';
import { RDSService } from '../../../shared/service/rds.service';
import { TypeDefautService } from '../../../shared/service/type-defaut.service';
import { TypeProjetService } from '../../../shared/service/type-projet.service';
import { EquipeService } from '../../../shared/service/equipe.service';
import { Equipe } from '../../../shared/model/equipe';

@Component({
  selector: 'app-form-update-projet',
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
  templateUrl: './form-update-projet.component.html',
  styleUrl: './form-update-projet.component.css'
})
export class FormUpdateProjetComponent {

  formUpdate!: FormGroup;
  idProjet!: number
  projetById!: Projet;
  clients: Client[] = [];
  typesProjet!: TypeProjet[];
  typesDefaut!: TypeDefaut[];
  etats!: EtatProjet[];
  rds!: RDS[];
  equipes!: Equipe[];

  constructor(private projetService: ProjetService, private clientService: ClientService, private typeProjetService: TypeProjetService, private typeDefautService: TypeDefautService, private etatProjetService: EtatProjetService, private rdsService: RDSService, private equipeService: EquipeService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    // Création du formulaire réactif
    this.formUpdate = new FormGroup({
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
      equipes: new FormControl('')
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

    // Récupération de l'identifiant du projet à modifier
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.idProjet = id;
      }
    })

    // Récupération des informations du projet à modifier à partir de son identifiant
    this.projetService.getProjetById(this.idProjet).subscribe(data => {
      this.projetById = data;
      this.formUpdate.get('nom')?.setValue(this.projetById.nomProjet);
      this.formUpdate.get('jira')?.setValue(this.projetById.jira);
      this.formUpdate.get('techno')?.setValue(this.projetById.techno);
      this.formUpdate.get('dateDemande')?.setValue(this.projetById.dateDemande);
      this.formUpdate.get('livraisonSouhaitee')?.setValue(this.projetById.livraisonSouhaitee);
      this.formUpdate.get('livraisonRevisee')?.setValue(this.projetById.livraisonRevisee);
      this.formUpdate.get('affectationCDS')?.setValue(this.projetById.affectationCDS);
      this.formUpdate.get('priseEnCompteCDS')?.setValue(this.projetById.priseEnCompteCDS);
      this.formUpdate.get('dateEstimation')?.setValue(this.projetById.dateEstimation);
      this.formUpdate.get('devisEstimation')?.setValue(this.projetById.devisEstimation);
      this.formUpdate.get('dontGarantie')?.setValue(this.projetById.dontGarantie);
      this.formUpdate.get('dateFeuVert')?.setValue(this.projetById.dateFeuVert);
      this.formUpdate.get('dateLivraison')?.setValue(this.projetById.dateLivraison);
      this.formUpdate.get('datePassageMCO')?.setValue(this.projetById.datePassageMCO);
      this.formUpdate.get('dateSortieMCO')?.setValue(this.projetById.dateSortieMCO);
      this.formUpdate.get('commentaires')?.setValue(this.projetById.commentaires);
      this.formUpdate.get('client')?.setValue(this.projetById.nomClient);
      this.formUpdate.get('typeProjet')?.setValue(this.projetById.libelleTypeProjet);
      this.formUpdate.get('typeDefaut')?.setValue(this.projetById.libelleTypeDefaut);
      this.formUpdate.get('etat')?.setValue(this.projetById.libelleEtat);
      this.formUpdate.get('rds')?.setValue(this.projetById.rds);
      this.formUpdate.get('equipes')?.setValue(this.projetById.libelleEquipe);

      // Affichage ou non du champ RDS selon le nom du client
      this.onClientSelectionChange();

      /*// Remplissage de la liste déroulante des compositions
      let select = document.getElementById("compositions");
      let html = "";
      for (let composition of this.compositions) {
        if (this.projetById != undefined) {
          let found = false;
          for (let c of this.projetById.listCompositions) {
            if (c[0] == composition[0]) {
              html += `<option
                  value="${composition[0]}, ${composition[1]}, ${composition[2]}" selected>
                  Equipe ${composition[1]}, Utilisateur ${composition[2]}</option>`;
              found = true;
            }
          }
          if (!found) {
            html += `<option
            value="${composition[0]}, ${composition[1]}, ${composition[2]}">
            Equipe ${composition[1]}, Utilisateur ${composition[2]}</option>`;
          }
        }
      }
      select!.innerHTML = html;
      console.log(this.projetById.listCompositions);
      this.formUpdate.get('compositions')?.setValue(this.projetById.listCompositions);
    })*/
    });
  }

  // Méthode exécutée quand on change la valeur du champ client
  onClientSelectionChange() {

    if (this.formUpdate.get('client')?.value == "CALEF") {
      this.formUpdate.get('rds')?.enable();
    } else{
      this.formUpdate.get('rds')?.disable();
    } 
    

    if (this.formUpdate.get('client')?.value == "MSA"){
      this.formUpdate.get('jira')?.enable();
      this.formUpdate.get('devisEstimation')?.enable();
      this.formUpdate.get('dontGarantie')?.enable();
    } else {
      this.formUpdate.get('jira')?.disable();
      this.formUpdate.get('devisEstimation')?.disable();
      this.formUpdate.get('dontGarantie')?.disable();
    }

  }

  onClickResetTypeDefaut() {
    this.formUpdate.get('typeDefaut')?.setValue('');
  }

  onClickResetEquipe() {
    this.formUpdate.get('equipes')?.setValue('');
  }

  // Méthode exécutée quand on appuie sur le bouton Retour
  onClose() {
    this.router.navigateByUrl("/projets");
  }

  // Méthode exécutée quand on appuie sur le bouton Envoyer
  onSubmit(): void {

    if (this.formUpdate.controls['nom'].hasError('required') ||
      this.formUpdate.controls['jira'].hasError('required') ||
      this.formUpdate.controls['dateDemande'].hasError('required') ||
      this.formUpdate.controls['devisEstimation'].hasError('required') ||
      this.formUpdate.controls['dontGarantie'].hasError('required') ||
      this.formUpdate.controls['client'].hasError('required') ||
      this.formUpdate.controls['typeProjet'].hasError('required') ||
      this.formUpdate.controls['etat'].hasError('required') ||
      this.formUpdate.controls['rds'].hasError('required')) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.projetById.nomProjet = this.formUpdate.get("nom")?.value;

      this.projetById.techno = this.formUpdate.get("techno")?.value;
      this.projetById.dateDemande = this.formUpdate.get("dateDemande")?.value;
      this.projetById.livraisonSouhaitee = this.formUpdate.get("livraisonSouhaitee")?.value;
      this.projetById.livraisonRevisee = this.formUpdate.get("livraisonRevisee")?.value;
      this.projetById.affectationCDS = this.formUpdate.get("affectationCDS")?.value;
      this.projetById.priseEnCompteCDS = this.formUpdate.get("priseEnCompteCDS")?.value;
      this.projetById.dateEstimation = this.formUpdate.get("dateEstimation")?.value;
      this.projetById.dateFeuVert = this.formUpdate.get("dateFeuVert")?.value;
      this.projetById.dateLivraison = this.formUpdate.get("dateLivraison")?.value;
      this.projetById.datePassageMCO = this.formUpdate.get("datePassageMCO")?.value;
      this.projetById.dateSortieMCO = this.formUpdate.get("dateSortieMCO")?.value;

      // mco est défini à true quand seule la date de passage est donnée, sinon mco est défini à false
      if ((this.projetById.datePassageMCO && this.projetById.dateSortieMCO) || (!this.projetById.datePassageMCO && !this.projetById.dateSortieMCO)) {
        this.projetById.mco = false;
      } else if (this.projetById.datePassageMCO && !this.projetById.dateSortieMCO) {
        this.projetById.mco = true;
      }

      this.projetById.commentaires = this.formUpdate.get("commentaires")?.value;
      this.projetById.nomClient = this.formUpdate.get("client")?.value;
      this.projetById.libelleTypeProjet = this.formUpdate.get("typeProjet")?.value;
      this.projetById.libelleTypeDefaut = this.formUpdate.get("typeDefaut")?.value;
      this.projetById.libelleEtat = this.formUpdate.get("etat")?.value;

      if (this.projetById.nomClient == "CALEF") {
        this.projetById.rds = this.formUpdate.get("rds")?.value;
      } else {
        this.projetById.rds = null;
      }

      if (this.projetById.nomClient == "MSA") {
        this.projetById.jira = this.formUpdate.get("jira")?.value;
        this.projetById.devisEstimation = this.formUpdate.get("devisEstimation")?.value;
        this.projetById.dontGarantie = this.formUpdate.get('dontGarantie')?.value;
      } else {
        this.projetById.jira = "";
        this.projetById.devisEstimation = 0;
        this.projetById.dontGarantie = 0;
      }

      this.projetById.libelleEquipe = this.formUpdate.get("equipes")?.value;

      /*// Ici, je suis obligé faire une conversion, car dans le remplissage de la liste des compositions en javascript, l'attribut value de chaque élément option a sa valeur transformée en string et non en tableau de string 
      let listC: string[][] = [];
      this.formUpdate.get("compositions")?.value.forEach((c: any) => {
        if (typeof(c) == "string") {
          let temp0: string[] = [];
          let temp: any[] = c.split(",");
          temp[0] = parseInt(temp[0]);
          temp.forEach(value => {
            temp0.push(value);
          })
          listC.push(temp0);
        }
      })
      if (listC.length != 0){
        this.projetById.listCompositions = listC;
      } else {
        this.projetById.listCompositions = this.formUpdate.get("compositions")?.value;
      }*/

      this.projetService.update(this.projetById).subscribe({
        next: (response) => {
          alert('Projet ' + response.nomProjet + ' modifié!');
          this.router.navigateByUrl("/projets");
        },
        error: (error) => {
          console.error('Erreur lors de la modification du projet', error);
        }
      });
    }

  }

}
