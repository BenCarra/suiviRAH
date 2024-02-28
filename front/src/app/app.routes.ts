import { Routes } from '@angular/router';
import { PageAccueilAdminComponent } from './pages/page-accueil-admin/page-accueil-admin.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageUtilisateursAdminComponent } from './pages/page-utilisateurs-admin/page-utilisateurs-admin.component';
import { FormUpdateUtilisateurComponent } from './pages/forms/form-update-utilisateur/form-update-utilisateur.component';;
import { FormCreateUtilisateurComponent } from './pages/forms/form-create-utilisateur/form-create-utilisateur.component';
<<<<<<< HEAD
import { PageClientsAdminComponent } from './pages/page-clients-admin/page-clients-admin.component';
=======
import { PageClientsAdminComponent } from './page-clients-admin/page-clients-admin.component';
>>>>>>> 9a1ec0b207a32a070b40e2331aafefec9a5cc7cf

export const routes: Routes = [{path: '', component:HomeComponent},
{path:'admin/accueil', component:PageAccueilAdminComponent},
{path:'admin/utilisateurs', component: PageUtilisateursAdminComponent},
{path: 'admin/utilisateurs/create', component:FormCreateUtilisateurComponent},
{path: 'admin/utilisateurs/update/:id', component:FormUpdateUtilisateurComponent},
{path: 'admin/clients', component:PageClientsAdminComponent},
{path: "**", component:NotFoundComponent}];

