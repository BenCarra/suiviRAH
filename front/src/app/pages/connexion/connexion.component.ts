import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [MatCardModule,
    ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit {

  formConnexion!: FormGroup;
  infosConnexion = {Username:'', Password:''};

  constructor(private formBuilder: FormBuilder,
     private authService: AuthService,
     private router: Router) {     
    }
  ngOnInit(): void {
    this.formConnexion = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formConnexion.valid) {
      console.log('Données de connexion :', this.formConnexion.value);
      this.authService.login(this.formConnexion.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response);
          // Rediriger l'utilisateur vers une autre page
          // par exemple, la page d'accueil
          // Afficher le contenu de la réponse dans la console
        console.log('Réponse de connexion :', response);
        // Stocker le token JWT dans le stockage local
          this.router.navigate(['/taches']);
        },
        error: (error) => {
          // Gérer les erreurs de connexion
          console.error('Erreur lors de l\'authentification :', error);
        }
      });
    }
  }
    // if (this.formConnexion.valid) {
    //   console.log('Données de connexion :', this.formConnexion.value);
    //   this.authService.login(this.formConnexion.value);
    //     localStorage.setItem('token', Response.token);
    // }
  }


