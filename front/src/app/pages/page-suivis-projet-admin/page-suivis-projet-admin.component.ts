import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { SuiviProjetListComponent } from "../suivi-projet-list/suivi-projet-list.component";

@Component({
    selector: 'app-page-suivis-projet-admin',
    standalone: true,
    templateUrl: './page-suivis-projet-admin.component.html',
    styleUrl: './page-suivis-projet-admin.component.css',
    imports: [HeaderComponent, FooterComponent, SuiviProjetListComponent]
})
export class PageSuivisProjetAdminComponent {

}
