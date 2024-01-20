import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: any = []
  searchKey: any = ''

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getProducts();
    this.api.searchTerm.subscribe((term: any) => this.searchKey = term)
  }


  getProducts = () => {
    this.api.getAllProducts().subscribe({
      next: (res) => {
        console.log(res)
        this.allProducts = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
