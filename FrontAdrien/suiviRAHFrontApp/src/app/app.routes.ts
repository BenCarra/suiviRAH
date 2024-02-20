import { Routes } from '@angular/router';
import { PageAccueilAdminComponent } from './page-accueil-admin/page-accueil-admin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageUtilisateursAdminComponent } from './page-utilisateurs-admin/page-utilisateurs-admin.component';

export const routes: Routes = [{path: '', component:HomeComponent},{path:'admin/accueil', component:PageAccueilAdminComponent},
{path:'admin/calendrier', component: HeaderComponent}, {path:'admin/utilisateurs', component: PageUtilisateursAdminComponent},
{path: "**", component:NotFoundComponent}];
