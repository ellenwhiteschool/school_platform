import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { StorageServiceModule} from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { UrlComponent } from './url/url.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { RelInstComponent } from './rel-inst/rel-inst.component';
import { EditarComponent } from './general/editar/editar.component';
import { ListarComponent } from './general/listar/listar.component';
import { EliminarComponent } from './general/eliminar/eliminar.component';
import { SearchPipe } from './search.pipe';
import { UsuariosComponent } from './general/agregar/usuarios/usuarios.component';
import { EstudiantesComponent } from './general/agregar/usuarios/estudiantes/estudiantes.component';
import { EmpleadosComponent } from './general/agregar/usuarios/empleados/empleados.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'relaciones_instituciones', component: RelInstComponent },
  { path: 'add/usuarios', component: UsuariosComponent },
  { path: 'add/student', component: EstudiantesComponent },
  { path: 'edit/:tipo/:id', component: EditarComponent },
  { path: 'view/:tipo', component: ListarComponent },
  { path: 'delete/:tipo/:id', component: EliminarComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
]

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RecoveryComponent,
    UrlComponent,
    DashboardComponent,
    LogoutComponent,
    RelInstComponent,
    EditarComponent,
    ListarComponent,
    EliminarComponent,
    SearchPipe,
    UsuariosComponent,
    EstudiantesComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule,
    RouterModule.forRoot(routes,{useHash:true}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
