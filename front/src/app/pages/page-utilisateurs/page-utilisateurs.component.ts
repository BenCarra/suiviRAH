import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { UtilisateurListComponent } from '../utilisateur-list/utilisateur-list.component';
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-utilisateurs',
    standalone: true,
    templateUrl: './page-utilisateurs.component.html',
    styleUrl: './page-utilisateurs.component.scss',
    imports: [RouterLink, HeaderComponent, UtilisateurListComponent, FooterComponent]
})
export class PageUtilisateursComponent {

}
