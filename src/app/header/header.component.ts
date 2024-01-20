import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private searchKey: ApiService) { }

  search = (event: any) => {
    this.searchKey.searchTerm.next(event.target.value)
    console.log(event.target.value)
  }
}
