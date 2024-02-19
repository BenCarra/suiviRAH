import { Routes } from '@angular/router';
import { PageAccueilAdminComponent } from './page-accueil-admin/page-accueil-admin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [{path: '', component:HomeComponent},{path:'accueil', component:PageAccueilAdminComponent},
{path:'calendrier', component: HeaderComponent},
{path: "**", component:NotFoundComponent}];
