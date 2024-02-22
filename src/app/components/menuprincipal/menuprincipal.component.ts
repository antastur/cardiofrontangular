import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.component.html',
  styleUrls: ['./menuprincipal.component.css']
})


//Componente que tan solo ofrece enlaces en su vista a distintas partes de la app
export class MenuprincipalComponent implements OnInit{

  constructor(private router: Router) { }


  ngOnInit(): void {

  }



}
