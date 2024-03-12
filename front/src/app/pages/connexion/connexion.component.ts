import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../shared/service/security.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {

  formConnexion!: FormGroup
  model!: any;

  constructor(private securityService: SecurityService, private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {

  }

  ngOnInit(){
    this.formConnexion = new FormGroup({
      login: new FormControl('', Validators.required),
      motDePasse: new FormControl('', Validators.required),
      btnConnexion: new FormControl('Connexion')
    })
    sessionStorage.setItem('token', '');
  }
  
  login() {

    this.model = {login: this.formConnexion.get('login')?.value,
    motDePasse: this.formConnexion.get('motDePasse')?.value};
    console.log(this.model);

    if (this.formConnexion.controls["login"].hasError("required") ||
    this.formConnexion.controls["motDePasse"].hasError("required")) {
      console.log("Un ou plusieurs champs sont requis");
    } else {
      this.securityService.authenticate(this.model, () => {
        this.router.navigateByUrl('/admin/accueil');
      })
    }
    

  }

}
