import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SecurityService } from '../../service/security.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private securityService: SecurityService, private router: Router) {
    // this.securityService.authenticate(undefined, undefined);
  }
  
  // Méthode de déconnexion
  logout() {
    /*this.securityService.logout();
    this.router.navigateByUrl("/login");*/
  }

  // Méthode qui retourne si un utilisateur est authentifié
  authenticated() {
    return this.securityService.authenticated;
  }

}
