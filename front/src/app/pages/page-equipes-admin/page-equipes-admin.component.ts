import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { EquipeListComponent } from "../equipe-list/equipe-list.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-equipes-admin',
    standalone: true,
    templateUrl: './page-equipes-admin.component.html',
    styleUrl: './page-equipes-admin.component.css',
    imports: [RouterLink, HeaderComponent, FooterComponent, EquipeListComponent]
})
export class PageEquipesAdminComponent {

}
