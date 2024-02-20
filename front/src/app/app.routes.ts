import { Routes } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { CalendrierComponent } from './component/calendrier/calendrier.component';
import { ListProjetsComponent } from './component/list-projets/list-projets.component';
import { ListTachesComponent } from './component/list-taches/list-taches.component';

export const routes: Routes = [
    {path:'', component:AccueilComponent},
    {path:'calendrier', component:CalendrierComponent},
    {path:'listProjets', component: ListProjetsComponent},
    {path:'listTaches', component: ListTachesComponent}
];
