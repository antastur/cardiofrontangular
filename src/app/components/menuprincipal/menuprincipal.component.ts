import { Router } from '@angular/router';
import { MenuprincipalService } from './../../shared/services/menuprincipal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.component.html',
  styleUrls: ['./menuprincipal.component.css']
})
export class MenuprincipalComponent implements OnInit{

  constructor(public menuprincipalService: MenuprincipalService,private router: Router) { }
  ngOnInit(): void {

  }



}
