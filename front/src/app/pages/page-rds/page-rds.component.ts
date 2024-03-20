import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/component/header/header.component";
import { FooterComponent } from "../../shared/component/footer/footer.component";

@Component({
    selector: 'app-page-rds',
    standalone: true,
    templateUrl: './page-rds.component.html',
    styleUrl: './page-rds.component.css',
    imports: [HeaderComponent, FooterComponent]
})
export class PageRDSComponent {

}
