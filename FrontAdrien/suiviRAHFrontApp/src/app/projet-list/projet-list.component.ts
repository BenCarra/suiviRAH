import { Component } from '@angular/core';
import { ProjetService } from '../projet.service';
import { Projet } from '../projet';

@Component({
  selector: 'app-projet-list',
  standalone: true,
  imports: [],
  templateUrl: './projet-list.component.html',
  styleUrl: './projet-list.component.scss'
})
export class ProjetListComponent {

  listProjets!: Projet[];

  constructor(private projetService: ProjetService){

  }

  ngOnInit(){
    this.projetService.findAll().subscribe(data => {
      console.log(data);
      this.listProjets = data;
    })
  }

}
