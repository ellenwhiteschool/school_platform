import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  valido: Boolean = true;
  loading: Boolean = false;
  message = {};

  constructor(private http: HttpClient) { }

  onRecovery(f: NgForm) {
    interface Mensaje{
      type: string;
      mensaje: string;
    }
    this.valido = f.valid;
    this.loading = true;
    if(this.valido){
      this.http.post<Mensaje>('http://localhost/platform/backend2/recovery',JSON.stringify(f.value))
      .subscribe(
        data => {
          this.message = data;
          this.loading = false;
        }
      )
    }else{
      this.message = {'type':'alert-warning alert','mensaje':'Recuerda llenar todos los campos'};
      this.loading = false;
    }
  }

}
