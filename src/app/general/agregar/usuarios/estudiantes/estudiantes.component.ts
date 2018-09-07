import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  ver1 : Boolean = true;
  ver2 : Boolean = false;
  ver3 : Boolean = false;
  ver4 : Boolean = false;
  discapacidadS : Boolean = false;
  etniaS : Boolean = false;
  codigo_int : String;
  departamentos:any = [];
  ciudad:any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    interface Codigo{
      codigo : String;asdasd
    }
    this.http.get<Codigo>("http://localhost/platform/backend2/codigo_interno_estudiante")
    .subscribe(
      data => {
        this.codigo_int = data.codigo;
      }
    )

    this.http.get("http://localhost/platform/backend2/departamentos")
    .subscribe(
      data => {
        this.departamentos = data;
        console.log(this.departamentos);
      }
    )
  }

  ver(id): void {
    this.ver1 = false;
    this.ver2 = false;
    this.ver3 = false;
    this.ver4 = false;
    switch(id){
      case 1: this.ver1 = true;
      break;
      case 2: this.ver2 = true;
      break;
      case 3: this.ver3 = true;
      break;
      case 4: this.ver4 = true;
      break;
    }
  }

  submitStudent(f: NgForm){
    console.log(f.value);
    if(!f.valid){
      alert("Recuerde llenar toda la informacion antes de continuar");
    }
  }

  discapacidadSelect(anyThing:any){
    this.discapacidadS = (anyThing=='si') ? true : false;
  }

  etniaSelect(anyThing:any){
    this.etniaS = (anyThing=='si') ? true : false;
  }

  selectDep(anyThing:any){
    this.http.post("http://localhost/platform/backend2/ciudad",{"dep":anyThing})
    .subscribe(
      data => {
        this.ciudad = data;
      }
    )
  }

}
