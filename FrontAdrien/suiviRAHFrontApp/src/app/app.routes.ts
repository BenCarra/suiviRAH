import { Routes } from '@angular/router';
import { PageAccueilAdminComponent } from './page-accueil-admin/page-accueil-admin.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [{path:'accueil', component:PageAccueilAdminComponent},
{path:'calendrier', component: HeaderComponent}];
