import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form/user-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Ajout de RouterLink pour qu'on puisse accéder à /users et /adduser
  imports: [RouterOutlet, UserListComponent, UserFormComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_test';
}
