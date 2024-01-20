import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = []
  totalPrice: any = 0
  public payPalConfig?: IPayPalConfig;
  showSuccess: Boolean = false
  showPayPal: Boolean = false

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getCart()
    this.initConfig();
  }

  getCart = () => {
    this.api.getCartItems().subscribe({
      next: (res: any) => {
        console.log(res)
        this.cartItems = res
        this.totalPrice = Math.floor(res.map((item: any) => item.total_price).reduce((a: any, b: any) => a + b))
        console.log(this.totalPrice)
      },
      error: (err: any) => {
        console.log(err)
        alert(err.error)
      }
    })
  }

  handleDelete = (id: any) => {
    this.api.deleteCartItem(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getCart()
        this.totalPrice = Math.floor(this.cartItems.map((item: any) => item.total_price).reduce((a: any, b: any) => a + b))
      },
      error: (err: any) => {
        console.log(err)
        alert(err.error)
      }
    })
  }

  handleIncrement = (product: any) => {
    this.api.incrementQuantity(product._id, { price: product.price }).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getCart()
        this.totalPrice = Math.floor(this.cartItems.map((item: any) => item.total_price).reduce((a: any, b: any) => a + b))
      },
      error: (err: any) => {
        console.log(err)
        alert(err.error)
      }
    })
  }
  handleDecrement = (product: any) => {
    this.api.decrementQuantity(product._id, { price: product.price }).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getCart()
        this.totalPrice = Math.floor(this.cartItems.map((item: any) => item.total_price).reduce((a: any, b: any) => a + b))
      },
      error: (err: any) => {
        console.log(err)
        alert(err.error)
      }
    })
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  makePay = () => {
    this.showPayPal = true
  }
}
