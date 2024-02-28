import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { ClientListComponent } from "../client-list/client-list.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-clients-admin',
    standalone: true,
    templateUrl: './page-clients-admin.component.html',
    styleUrl: './page-clients-admin.component.css',
    imports: [RouterLink, HeaderComponent, FooterComponent, ClientListComponent]
})
export class PageClientsAdminComponent {

}
