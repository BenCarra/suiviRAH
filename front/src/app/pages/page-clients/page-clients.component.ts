import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { RouterLink } from '@angular/router';
import { ClientListComponent } from '../client-list/client-list.component';

@Component({
    selector: 'app-page-clients',
    standalone: true,
    templateUrl: './page-clients.component.html',
    styleUrl: './page-clients.component.css',
    imports: [RouterLink, HeaderComponent, FooterComponent, ClientListComponent]
})
export class PageClientsComponent {

}
