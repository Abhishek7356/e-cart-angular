import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allWishlistProduct: any = []
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.wishListAction()
  }

  wishListAction = () => {
    this.api.getWishlist().subscribe({
      next: (res: any) => {
        console.log(res)
        this.allWishlistProduct = res
      },
      error: (err: any) => {
        alert(err.error)
      }
    })
  }

  handleDelete = (id: any) => {
    this.api.deleteWishlist(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.wishListAction()
      },
      error: (err) => {
        console.log(err)
        alert("something went wrong")
      }
    })
  }

}
