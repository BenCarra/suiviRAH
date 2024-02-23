import { Routes } from '@angular/router';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { CalendrierComponent } from './page/calendrier/calendrier.component';
import { ListProjetsComponent } from './page/list-projets/list-projets.component';
import { ListTachesComponent } from './page/list-taches/list-taches.component';
import { FormCreateTacheComponent } from './page/form-create-tache/form-create-tache.component';

export const routes: Routes = [
    {path:'', component: ConnexionComponent},
    {path:'calendrier', component: CalendrierComponent},
    {path:'listProjets', component: ListProjetsComponent},
    {path:'listTaches', component: ListTachesComponent},
    {path:'formCreateTache', component: FormCreateTacheComponent}
];
