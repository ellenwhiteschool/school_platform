import { Component, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public data:any=[];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }

}
