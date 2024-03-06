import { Routes } from '@angular/router';
import { PageAccueilAdminComponent } from './pages/page-accueil-admin/page-accueil-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageUtilisateursAdminComponent } from './pages/page-utilisateurs-admin/page-utilisateurs-admin.component';
import { FormUpdateUtilisateurComponent } from './pages/forms/form-update-utilisateur/form-update-utilisateur.component';;
import { FormCreateUtilisateurComponent } from './pages/forms/form-create-utilisateur/form-create-utilisateur.component';
import { PageClientsAdminComponent } from './pages/page-clients-admin/page-clients-admin.component';
import { FormCreateClientComponent } from './pages/forms/form-create-client/form-create-client.component';
import { FormUpdateClientComponent } from './pages/forms/form-update-client/form-update-client.component';
import { PageEquipesAdminComponent } from './pages/page-equipes-admin/page-equipes-admin.component';
import { FormCreateEquipeComponent } from './pages/forms/form-create-equipe/form-create-equipe.component';
import { FormUpdateEquipeComponent } from './pages/forms/form-update-equipe/form-update-equipe.component';
/*import { ListProjetsComponent } from './pages/list-projets/list-projets.component';
import { ListTachesComponent } from './pages/list-taches/list-taches.component';
import { FormCreateTacheComponent } from './pages/forms/form-create-tache/form-create-tache.component';
import { FormUpdateTacheComponent } from './pages/forms/form-update-tache/form-update-tache.component';*/

export const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'admin/accueil', component: PageAccueilAdminComponent },
{ path: 'admin/utilisateurs', component: PageUtilisateursAdminComponent },
{ path: 'admin/utilisateurs/create', component: FormCreateUtilisateurComponent },
{ path: 'admin/utilisateurs/update', component: FormUpdateUtilisateurComponent },
{ path: 'admin/clients', component: PageClientsAdminComponent },
{ path: 'admin/clients/create', component: FormCreateClientComponent },
{ path: 'admin/clients/update', component: FormUpdateClientComponent },
{ path: 'admin/equipes', component: PageEquipesAdminComponent },
{ path: 'admin/equipes/create', component: FormCreateEquipeComponent },
{ path: 'admin/equipes/update', component: FormUpdateEquipeComponent },
/*{ path: 'admin/projets', component: ListProjetsComponent },
{path: 'admin/projets/create, component: FormCreateProjetComponent},
{path: 'admin/projets/update, component: FormUpdateProjetComponent},
{ path: 'admin/taches', component: ListTachesComponent },
{ path: 'admin/taches/create', component:  FormCreateTacheComponent},
{ path: 'admin/taches/update', component: FormUpdateTacheComponent },*/
{ path: "**", component: NotFoundComponent }];

