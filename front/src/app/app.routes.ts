import { Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { CalendrierComponent } from './pages/calendrier/calendrier.component';
import { ListProjetsComponent } from './pages/list-projets/list-projets.component';
import { ListTachesComponent } from './pages/list-taches/list-taches.component';
import { FormCreateTacheComponent } from './pages/forms/form-create-tache/form-create-tache.component';
import { FormUpdateTacheComponent } from './pages/forms/form-update-tache/form-update-tache.component';

export const routes: Routes = [
    {path:'', component: ConnexionComponent},
    {path:'calendrier', component: CalendrierComponent},
    {path:'listProjets', component: ListProjetsComponent},
    {path:'listTaches', component: ListTachesComponent},
    {path:'formCreateTache', component: FormCreateTacheComponent},
    {path:'formUpdateTache', component: FormUpdateTacheComponent}
];
