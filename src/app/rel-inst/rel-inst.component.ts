import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rel-inst',
  templateUrl: './rel-inst.component.html',
  styleUrls: ['./rel-inst.component.css']
})
export class RelInstComponent implements OnInit {
  public user = {'usuario':null};
  instituciones:any=[];
  obt:Boolean = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getFromLocal('usuario');
    this.http.post("http://localhost/platform/backend2/relacion_institucion",JSON.stringify(this.user))
    .subscribe(
      data => {
        this.instituciones = data;
        this.obt = false;
        if(this.instituciones.length>0){
          this.obt = true;
        }
      }
    )
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): void {
    this.user[key] = this.storage.get(key);
  }

  enterIns(nombre,id_sede,id_rol,n_sede,n_rol,cod,imagen): void {
    this.saveInLocal('institucion',nombre);
    this.saveInLocal('id_sede',id_sede);
    this.saveInLocal('id_rol',id_rol);
    this.saveInLocal('n_sede',n_sede);
    this.saveInLocal('n_rol',n_rol);
    this.saveInLocal('cod',cod);
    this.saveInLocal('imagen',imagen);
    window.location.href = '/';
  }
}
