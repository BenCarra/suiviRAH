import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { ProjetListComponent } from "../projet-list/projet-list.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-projets',
    standalone: true,
    templateUrl: './page-projets.component.html',
    styleUrl: './page-projets.component.css',
    imports: [HeaderComponent, ProjetListComponent, FooterComponent, RouterLink]
})
export class PageProjetsComponent {

}
