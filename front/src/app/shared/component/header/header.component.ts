import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityService } from '../../service/security.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private securityService: SecurityService, private http: HttpClient, private router: Router) {
    // this.securityService.authenticate(undefined, undefined);
  }
  
  logout() {
    this.securityService.logout();
    this.router.navigateByUrl("/login");
  }

  authenticated() {
    return this.securityService.authenticated;
  }

}
