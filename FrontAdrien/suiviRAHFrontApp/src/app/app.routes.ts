import { Routes } from '@angular/router';
import { PageAccueilAdminComponent } from './pages/page-accueil-admin/page-accueil-admin.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageUtilisateursAdminComponent } from './pages/page-utilisateurs-admin/page-utilisateurs-admin.component';
import { FormUpdateUtilisateurComponent } from './pages/forms/form-update-utilisateur/form-update-utilisateur.component';

export const routes: Routes = [{path: '', component:HomeComponent},{path:'admin/accueil', component:PageAccueilAdminComponent},
{path:'admin/calendrier', component: HeaderComponent}, {path:'admin/utilisateurs', component: PageUtilisateursAdminComponent},
{path: 'admin/utilisateurs/update', component:FormUpdateUtilisateurComponent},{path: "**", component:NotFoundComponent}];
