import { Component, Inject, Input } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'school-platform',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logueado: Boolean = false;
  public user = {'n_sede':null,'nombre':null};
  abrev: string;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private translate: TranslateService) {
    this.getFromLocal('n_sede');
    if(this.user.n_sede!=null){
      this.logueado = true;
      this.getFromLocal('institucion');
      this.getFromLocal('id_sede');
      this.getFromLocal('id_rol');
      this.getFromLocal('n_rol');
      this.getFromLocal('usuario'),
      this.getFromLocal('nombre');
      this.getFromLocal('cod');
      this.getFromLocal('imagen');
      var s = this.user.nombre.split(" ");
      this.abrev = s[0].substr(0,1) + s[1].substr(0,1);
    }
  }
  
  getFromLocal(key): void {
    this.user[key] = this.storage.get(key);
  }
}
