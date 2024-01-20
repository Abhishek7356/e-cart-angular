import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product: any = {}

  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const { id } = res
      // console.log(id)
      this.api.getOneProduct(id).subscribe({
        next: (res: any) => {
          // console.log(res)
          this.product = res
        },
        error: (err: any) => {
          console.log(err)
          alert("Something went wrong, could'nt get product. Please try again later")
        }
      })
    })
  }

  addToWishlist = (product: any) => {
    const { title, price, image, _id } = product
    if (sessionStorage.getItem("token")) {
      this.api.addToWishlist({ title, price, image, productId: _id }).subscribe({
        next: (res: any) => {
          console.log(res)
          alert("Product added successfully")
        },
        error: (err: any) => {
          console.log(err)
          alert(err.error)
        }
      })
    }
  }

  addTocart = (product: any) => {
    const { title, price, image, _id } = product
    if (sessionStorage.getItem("token")) {
      this.api.addToCart({ title, price, image, productId: _id, quantity: 1, total_price: price }).subscribe({
        next: (res: any) => {
          console.log(res)
          alert("Product added successfully")
        },
        error: (err: any) => {
          console.log(err)
          alert(err.error)
        }
      })
    }
  }
}
