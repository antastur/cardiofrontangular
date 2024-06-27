
import { CrearespacioComponent } from './components/crear/crearespacio/crearespacio.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { VerlugaresComponent } from './components/ver/verlugares/verlugares.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTableModule} from '@angular/material/table';
import { ConsultaEquiposComponent } from './components/consultar/consultaEquipos/consultaEquipos.component';
import { CrearlugarComponent } from './components/crear/crearlugar/crearlugar.component';
import {  HttpErrorInterceptorService } from './interceptors/HttpErrorInterceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

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
    VerlugaresComponent,
    CrearespacioComponent,
    ConsultaEquiposComponent,
    CrearlugarComponent,
    ConfirmationDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatTableModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,



  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
