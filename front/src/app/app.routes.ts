import { Routes } from '@angular/router';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { CalendrierComponent } from './component/calendrier/calendrier.component';
import { ListProjetsComponent } from './component/list-projets/list-projets.component';
import { ListTachesComponent } from './component/list-taches/list-taches.component';

export const routes: Routes = [
    {path:'', component:ConnexionComponent},
    {path:'calendrier', component:CalendrierComponent},
    {path:'listProjets', component: ListProjetsComponent},
    {path:'listTaches', component: ListTachesComponent}
];
