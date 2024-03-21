import { Routes } from '@angular/router';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageUtilisateursComponent } from './pages/page-utilisateurs/page-utilisateurs.component';
import { FormUpdateUtilisateurComponent } from './pages/forms/form-update-utilisateur/form-update-utilisateur.component';;
import { FormCreateUtilisateurComponent } from './pages/forms/form-create-utilisateur/form-create-utilisateur.component';
import { PageClientsComponent } from './pages/page-clients/page-clients.component';
import { FormCreateClientComponent } from './pages/forms/form-create-client/form-create-client.component';
import { FormUpdateClientComponent } from './pages/forms/form-update-client/form-update-client.component';
import { PageEquipesComponent } from './pages/page-equipes/page-equipes.component';
import { FormCreateEquipeComponent } from './pages/forms/form-create-equipe/form-create-equipe.component';
import { FormUpdateEquipeComponent } from './pages/forms/form-update-equipe/form-update-equipe.component';
import { PageParametresComponent } from './pages/page-parametres/page-parametres.component';
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
import { PageSuivisProjetComponent } from './pages/page-suivis-projet/page-suivis-projet.component';
import { PageRDSComponent } from './pages/page-rds/page-rds.component';
import { FormCreateRdsComponent } from './pages/forms/form-create-rds/form-create-rds.component';
import { FormUpdateRdsComponent } from './pages/forms/form-update-rds/form-update-rds.component';
/*import { ListProjetsComponent } from './pages/list-projets/list-projets.component';*/
/*import { ListTachesComponent } from './pages/list-taches/list-taches.component';
import { FormCreateTacheComponent } from './pages/forms/form-create-tache/form-create-tache.component';
import { FormUpdateTacheComponent } from './pages/forms/form-update-tache/form-update-tache.component';*/

// Routes à ajouter pour la navigation dans l'application front
export const routes: Routes = [
{ path: '', pathMatch:'full', redirectTo:'login'},
{ path: 'login', component: ConnexionComponent},
{ path: 'accueil', component: PageAccueilComponent },
/*{ path: 'calendrier', component: CalendrierComponent},*/
{ path: 'utilisateurs', component: PageUtilisateursComponent },
{ path: 'utilisateurs/create', component: FormCreateUtilisateurComponent },
{ path: 'utilisateurs/update', component: FormUpdateUtilisateurComponent },
{ path: 'clients', component: PageClientsComponent },
{ path: 'clients/create', component: FormCreateClientComponent },
{ path: 'clients/update', component: FormUpdateClientComponent },
{ path: 'equipes', component: PageEquipesComponent },
{ path: 'equipes/create', component: FormCreateEquipeComponent },
{ path: 'equipes/update', component: FormUpdateEquipeComponent },
/*{ path: 'projets', component: ListProjetsComponent },
{path: 'projets/create, component: FormCreateProjetComponent},
{path: 'projets/update, component: FormUpdateProjetComponent},*/
{ path: 'rds', component: PageRDSComponent},
{ path: 'rds/create', component: FormCreateRdsComponent},
{ path: 'rds/update', component: FormUpdateRdsComponent},
/*{ path: 'taches', component: ListTachesComponent },
{ path: 'taches/create', component:  FormCreateTacheComponent},
{ path: 'taches/update', component: FormUpdateTacheComponent },*/
{path: 'suivisProjet', component: PageSuivisProjetComponent},
{ path: 'parametres', component: PageParametresComponent},
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

