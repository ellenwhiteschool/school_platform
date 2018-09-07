import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  valido: Boolean = true;
  public user = {'usuario':null};
  public acceso:any=[];
  loading: Boolean = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private translate: TranslateService, private router: Router, private http: HttpClient, private cookie: CookieService) { 
    this.getFromLocal('usuario');
    if(this.user.usuario!=null){
      this.router.navigate(['dashboard']);
    }
  }

  submitLogin(f: NgForm){
    interface Login{
      id_u: string;
      nombre: string;
      status: string;
      mensaje: string;
      clase: string;
    }
    this.valido = f.valid;
    this.loading = true;
    if(this.valido){
      this.http.post<Login>('http://localhost/platform/backend2/login',JSON.stringify(f.value))
      .subscribe(
        data => {
          this.acceso = data;
          this.loading = false;
          if(this.acceso.status=='On'){
            this.saveInLocal('usuario',this.acceso.id_u);
            this.saveInLocal('nombre',this.acceso.nombre);
            this.router.navigate(['relaciones_instituciones']);
          }
        }
      )
    }else{
      this.acceso = {'clase':'alert-warning alert','mensaje':'Recuerde llenar todos los campos'};
      this.loading = false;
    }
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): void {
    this.user[key] = this.storage.get(key);
  }
}
