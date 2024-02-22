import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { ProjetListComponent } from '../projet-list/projet-list.component';

@Component({
    selector: 'app-page-accueil-admin',
    standalone: true,
    templateUrl: './page-accueil-admin.component.html',
    styleUrl: './page-accueil-admin.component.scss',
    imports: [HeaderComponent,ProjetListComponent, FooterComponent]
})
export class PageAccueilAdminComponent {

}
