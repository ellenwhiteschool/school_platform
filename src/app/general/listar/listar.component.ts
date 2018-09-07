import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  tipo : String = '';
  viewDocente : Boolean = false;
  docentes:any=[];
  docEx = false;
  public user = {'cod':null};
  cargando:Boolean = false;
  found;
  cant;

  constructor(private http:HttpClient, private route:ActivatedRoute, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.tipo = route.snapshot.paramMap.get('tipo');
    this.getFromLocal('cod');
    this.cargar();
  }

  cargar(){
    if(this.tipo=='docente'){
      this.viewDocente = true;
      this.cargando = true;
      this.http.post('http://localhost/platform/backend2/docentes_inst',JSON.stringify(this.user))
      .subscribe(
        data => {
          this.docentes = data;
          console.log(data);
          this.cant = this.docentes.length;
          if(this.cant<=0){
            this.found = true;
          }
          this.cargando = false;
        }
      )
    }
  }

  getFromLocal(key): void {
    this.user[key] = this.storage.get(key);
  }

  limpiar(){
    this.cargar();
  }

  filtro(id:String){
    let cliente = this.docentes.filter(item => item.nombre_personas == id);
    if(!this.docEx){
      this.cargar();
    }
    if(cliente.length > 0){
      this.docEx = true;
      this.docentes = cliente;
      this.docEx = false;
    }else{
      alert("No existe este numero de documento");
    }
  }

}
