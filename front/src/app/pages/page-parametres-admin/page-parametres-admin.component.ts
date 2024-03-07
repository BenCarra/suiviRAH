import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { TypeUtilisateurListComponent } from "../type-utilisateur-list/type-utilisateur-list.component";
import { TypeProjetListComponent } from "../type-projet-list/type-projet-list.component";
import { TypeDefautListComponent } from "../type-defaut-list/type-defaut-list.component";
import { TypeTacheListComponent } from "../type-tache-list/type-tache-list.component";
import { EtatProjetListComponent } from "../etat-projet-list/etat-projet-list.component";
import { SiteListComponent } from "../site-list/site-list.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-parametres-admin',
    standalone: true,
    templateUrl: './page-parametres-admin.component.html',
    styleUrl: './page-parametres-admin.component.css',
    imports: [RouterLink, HeaderComponent, FooterComponent, TypeUtilisateurListComponent, TypeProjetListComponent, TypeDefautListComponent, TypeTacheListComponent, EtatProjetListComponent, SiteListComponent]
})
export class PageParametresAdminComponent {

}
