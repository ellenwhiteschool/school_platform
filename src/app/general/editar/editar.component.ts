import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id : String = '';
  tipo : String = '';
  editarDP : Boolean = false;
  persona : any = [];
  foundU : Boolean = false;
  public user = {'cod':null};
  url = 'http://localhost/platform/backend2/personas_id';

  constructor(private http:HttpClient, private route:ActivatedRoute,@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.id = route.snapshot.paramMap.get('id');
    this.tipo = route.snapshot.paramMap.get('tipo');
    this.getFromLocal('cod');
  }

  ngOnInit() {
    if(this.tipo=='usuario'){
      this.editarDP = true;
      this.http.post(this.url,{'id':this.id,'tipo':'searchU'})
      .subscribe(
        data => {
          this.persona = data;
          if(this.persona.length>0){
            this.foundU = true;
          }
        }
      )
    }
  }

  editar(f: NgForm){
    interface edicion{
      status : String;
      message : String;
    }
    if(this.tipo=='usuario'){
      this.http.post<edicion>(this.url,JSON.stringify(f.value))
      .subscribe(
        data => {
          if(data.status=='success'){
            alert(data.message);
            window.location.reload();
          }else if(data.status=='fail'){
            alert(data.message);
          }
        }
      )
    }
  }

  getFromLocal(key): void {
    this.user[key] = this.storage.get(key);
  }

}
