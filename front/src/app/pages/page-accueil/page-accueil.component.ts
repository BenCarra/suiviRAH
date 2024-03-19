import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
//import { ListProjetsComponent } from '../list-projets/list-projets.component';
import { UtilisateurListComponent } from "../utilisateur-list/utilisateur-list.component";
import { ClientListComponent } from "../client-list/client-list.component";
import { EquipeListComponent } from "../equipe-list/equipe-list.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-accueil',
    standalone: true,
    templateUrl: './page-accueil.component.html',
    styleUrl: './page-accueil.component.scss',
    imports: [RouterLink ,HeaderComponent, FooterComponent, UtilisateurListComponent, ClientListComponent, EquipeListComponent]
})
export class PageAccueilComponent {

}
