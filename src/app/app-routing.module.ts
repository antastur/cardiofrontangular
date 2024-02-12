import { CrearclienteComponent } from './components/crear/crearcliente/crearcliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuprincipalComponent } from './components/menuprincipal/menuprincipal.component';
import { CrearequipoComponent } from './components/crear/crearequipo/crearequipo.component';
import { VerequiposComponent } from './components/ver/verequipos/verequipos.component';
import { VerclientesComponent } from './components/ver/verclientes/verclientes.component';
import { CrearalumnoComponent } from './components/crear/crearalumno/crearalumno.component';
import { VeralumnosComponent } from './components/ver/veralumnos/veralumnos.component';
import { CrearespacioComponent } from './components/crear/crearespacio/crearespacio.component';
import { VerespaciosComponent } from './components/ver/verespacios/verespacios.component';
import { CrearcursoComponent } from './components/crear/crearcurso/crearcurso.component';
import { VercursosComponent } from './components/ver/vercursos/vercursos.component';
import { ConsultaEquiposComponent } from './components/consultar/consultaEquipos/consultaEquipos.component';
import { CrearlugarComponent } from './components/crear/crearlugar/crearlugar.component';
import { VerlugaresComponent } from './components/ver/verlugares/verlugares.component';
import { VerformacionesComponent } from './components/ver/verformaciones/verformaciones.component';
import { CrearformacionComponent } from './components/crear/crearformacion/crearformacion.component';

const routes: Routes = [
  {path:'',redirectTo:'cardio/menuPrincipal', pathMatch:'full'},
  {path:'cardio/menuPrincipal',component:MenuprincipalComponent},
  {path:'cardio/menuPrincipal/equipos/edit',component:CrearequipoComponent},
  {path:'cardio/menuPrincipal/equipos/edit/:id',component:CrearequipoComponent},
  {path:'cardio/menuPrincipal/equipos',component:VerequiposComponent},
  {path:'cardio/menuPrincipal/equipos/consultas',component:ConsultaEquiposComponent},
  {path:'cardio/menuPrincipal/clientes/edit',component:CrearclienteComponent},
  {path:'cardio/menuPrincipal/clientes/edit/:id',component:CrearclienteComponent},
  {path:'cardio/menuPrincipal/clientes',component:VerclientesComponent},
  {path:'cardio/menuPrincipal/alumnos/edit',component:CrearalumnoComponent},
  {path:'cardio/menuPrincipal/alumnos/edit/:id',component:CrearalumnoComponent},
  {path:'cardio/menuPrincipal/alumnos',component:VeralumnosComponent},
  {path:'cardio/menuPrincipal/espacios/edit',component:CrearespacioComponent},
  {path:'cardio/menuPrincipal/espacios/edit/:id',component:CrearespacioComponent},
  {path:'cardio/menuPrincipal/espacios/:id',component:VerespaciosComponent},
  {path:'cardio/menuPrincipal/cursos/edit',component:CrearcursoComponent},
  {path:'cardio/menuPrincipal/cursos/edit/:id',component:CrearcursoComponent},
  {path:'cardio/menuPrincipal/cursos/:id',component:VercursosComponent},
  {path:'cardio/menuPrincipal/lugares/edit',component:CrearlugarComponent},
  {path:'cardio/menuPrincipal/lugares/edit/:id',component:CrearlugarComponent},
  {path:'cardio/menuPrincipal/lugares/:id',component:VerlugaresComponent},
  {path:'cardio/menuPrincipal/formaciones/edit',component:CrearformacionComponent},
  {path:'cardio/menuPrincipal/formaciones/edit/:id',component:CrearformacionComponent},
  {path:'cardio/menuPrincipal/formaciones',component:VerformacionesComponent},










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
