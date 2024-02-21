import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // import RouterLink obligatoire pour naviguer sur la navbar
  imports: [RouterLink, MatToolbarModule ], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
