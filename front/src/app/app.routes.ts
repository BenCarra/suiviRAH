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
import { PageParametresAdminComponent } from './pages/page-parametres-admin/page-parametres-admin.component';
import { FormUpdateTypeUtilisateurComponent } from './pages/forms/form-update-type-utilisateur/form-update-type-utilisateur.component';
import { FormCreateTypeUtilisateurComponent } from './pages/forms/form-create-type-utilisateur/form-create-type-utilisateur.component';
import { FormCreateTypeProjetComponent } from './pages/forms/form-create-type-projet/form-create-type-projet.component';
import { FormUpdateTypeProjetComponent } from './pages/forms/form-update-type-projet/form-update-type-projet.component';
import { FormCreateTypeDefautComponent } from './pages/forms/form-create-type-defaut/form-create-type-defaut.component';
import { FormUpdateTypeDefautComponent } from './pages/forms/form-update-type-defaut/form-update-type-defaut.component';
import { FormCreateTypeTacheComponent } from './pages/forms/form-create-type-tache/form-create-type-tache.component';
import { FormUpdateTypeTacheComponent } from './pages/forms/form-update-type-tache/form-update-type-tache.component';
import { FormCreateEtatProjetComponent } from './pages/forms/form-create-etat-projet/form-create-etat-projet.component';
import { FormUpdateEtatProjetComponent } from './pages/forms/form-update-etat-projet/form-update-etat-projet.component';
import { FormCreateSiteComponent } from './pages/forms/form-create-site/form-create-site.component';
import { FormUpdateSiteComponent } from './pages/forms/form-update-site/form-update-site.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { PageSuivisProjetAdminComponent } from './pages/page-suivis-projet-admin/page-suivis-projet-admin.component';
/*import { ListProjetsComponent } from './pages/list-projets/list-projets.component';
import { ListTachesComponent } from './pages/list-taches/list-taches.component';
import { FormCreateTacheComponent } from './pages/forms/form-create-tache/form-create-tache.component';
import { FormUpdateTacheComponent } from './pages/forms/form-update-tache/form-update-tache.component';*/

// Routes à ajouter pour la navigation dans l'application front
export const routes: Routes = [
{ path: '', pathMatch:'full', redirectTo:'login'},
{ path: 'login', component: ConnexionComponent},
{ path: 'accueil', component: PageAccueilAdminComponent },
/*{ path: 'calendrier', component: CalendrierComponent},*/
{ path: 'utilisateurs', component: PageUtilisateursAdminComponent },
{ path: 'utilisateurs/create', component: FormCreateUtilisateurComponent },
{ path: 'utilisateurs/update', component: FormUpdateUtilisateurComponent },
{ path: 'clients', component: PageClientsAdminComponent },
{ path: 'clients/create', component: FormCreateClientComponent },
{ path: 'clients/update', component: FormUpdateClientComponent },
{ path: 'equipes', component: PageEquipesAdminComponent },
{ path: 'equipes/create', component: FormCreateEquipeComponent },
{ path: 'equipes/update', component: FormUpdateEquipeComponent },
/*{ path: 'projets', component: ListProjetsComponent },
{path: 'projets/create, component: FormCreateProjetComponent},
{path: 'projets/update, component: FormUpdateProjetComponent},*/
/*{ path: 'taches', component: ListTachesComponent },
{ path: 'taches/create', component:  FormCreateTacheComponent},
{ path: 'taches/update', component: FormUpdateTacheComponent },*/
{path: 'suivisProjet', component: PageSuivisProjetAdminComponent},
{ path: 'parametres', component: PageParametresAdminComponent},
{ path : 'parametres/createTypeUtilisateur', component: FormCreateTypeUtilisateurComponent},
{ path : 'parametres/updateTypeUtilisateur', component: FormUpdateTypeUtilisateurComponent},
{ path : 'parametres/createTypeProjet', component: FormCreateTypeProjetComponent},
{ path : 'parametres/updateTypeProjet', component: FormUpdateTypeProjetComponent},
{ path : 'parametres/createTypeDefaut', component: FormCreateTypeDefautComponent},
{ path : 'parametres/updateTypeDefaut', component: FormUpdateTypeDefautComponent},
{ path : 'parametres/createTypeTache', component: FormCreateTypeTacheComponent},
{ path : 'parametres/updateTypeTache', component: FormUpdateTypeTacheComponent},
{ path : 'parametres/createEtatProjet', component: FormCreateEtatProjetComponent},
{ path : 'parametres/updateEtatProjet', component: FormUpdateEtatProjetComponent},
{ path : 'parametres/createSite', component: FormCreateSiteComponent},
{ path : 'parametres/updateSite', component: FormUpdateSiteComponent},
{ path: "**", component: NotFoundComponent }];

