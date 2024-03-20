import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/component/navbar/navbar.component";
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, 
    NavbarComponent,
    CommonModule]
})
export class AppComponent implements OnInit {
  // Je suppose que la navbar est toujours visible
  showNavbar: boolean = true;

  constructor(private router:Router) {
  }

  ngOnInit(): void {
    // Écoute les changements de route pour déterminer 
    // si la barre de navigation doit être affichée
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Si l'URL est celle de la page d'accueil 
        // je masque la barre de navigation
        this.showNavbar = event.url !== '/';
      }
    })
  }

  title = 'Super front !';
}
