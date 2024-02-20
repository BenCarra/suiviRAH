import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form/user-form.component';

export const routes: Routes = [
    { 'path': 'users', component: UserListComponent },
    { 'path': 'adduser', component: UserFormComponent }
  ];