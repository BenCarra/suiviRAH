import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { UtilisateurListComponent } from '../utilisateur-list/utilisateur-list.component';
import { FooterComponent } from "../../shared/component/footer/footer.component";

@Component({
    selector: 'app-page-utilisateurs-admin',
    standalone: true,
    templateUrl: './page-utilisateurs-admin.component.html',
    styleUrl: './page-utilisateurs-admin.component.scss',
    imports: [HeaderComponent, UtilisateurListComponent, FooterComponent]
})
export class PageUtilisateursAdminComponent {

}
