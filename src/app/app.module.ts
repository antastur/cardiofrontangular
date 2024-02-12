import { CrearespacioComponent } from './components/crear/crearespacio/crearespacio.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuprincipalComponent } from './components/menuprincipal/menuprincipal.component';
import { CrearequipoComponent } from './components/crear/crearequipo/crearequipo.component';
import { CrearclienteComponent } from './components/crear/crearcliente/crearcliente.component';
import { CrearcursoComponent } from './components/crear/crearcurso/crearcurso.component';
import { CreardiplomaComponent } from './components/crear/creardiploma/creardiploma.component';
import { VeralumnosComponent } from './components/ver/veralumnos/veralumnos.component';
import { VerequiposComponent } from './components/ver/verequipos/verequipos.component';
import { VerclientesComponent } from './components/ver/verclientes/verclientes.component';
import { VercursosComponent } from './components/ver/vercursos/vercursos.component';
import { VerformacionesComponent } from './components/ver/verformaciones/verformaciones.component';
import { VerespaciosComponent } from './components/ver/verespacios/verespacios.component';
import { VervehiculosComponent } from './components/ver/vervehiculos/vervehiculos.component';
import { VerlugaresComponent } from './components/ver/verlugares/verlugares.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTableModule} from '@angular/material/table';
import { ConsultaEquiposComponent } from './components/consultar/consultaEquipos/consultaEquipos.component';
import { CrearlugarComponent } from './components/crear/crearlugar/crearlugar.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuprincipalComponent,
    CrearequipoComponent,
    CrearclienteComponent,
    CrearcursoComponent,
    CrearespacioComponent,
    CreardiplomaComponent,
    VeralumnosComponent,
    VerequiposComponent,
    VerclientesComponent,
    VercursosComponent,
    VerformacionesComponent,
    VerespaciosComponent,
    VervehiculosComponent,
    VerlugaresComponent,
    CrearespacioComponent,
    ConsultaEquiposComponent,
    CrearlugarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatTableModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
