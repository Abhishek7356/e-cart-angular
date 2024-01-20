import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = 'http://localhost:3000'
  searchTerm = new BehaviorSubject('')

  constructor(private http: HttpClient) { }

  getAllProducts = () => {
    return this.http.get(`${this.serverUrl}/products`)
  }

  register = (body: any) => {
    return this.http.post(`${this.serverUrl}/user/register`, body)
  }
  login = (body: any) => {
    return this.http.post(`${this.serverUrl}/user/login`, body)
  }
  getOneProduct = (id: any) => {
    return this.http.get(`${this.serverUrl}/products/one/${id}`)
  }

  appentTokenHeaders = () => {
    let headers = new HttpHeaders()
    let token = sessionStorage.getItem("token");
    console.log(token)
    if (token) {
      headers = headers.append("token", `Bearer ${JSON.parse(token)}`)
    }
    return { headers }
  }

  addToWishlist = (body: any) => {
    return this.http.post(`${this.serverUrl}/add/wishlist`, body, this.appentTokenHeaders())
  }
  getWishlist = () => {
    return this.http.get(`${this.serverUrl}/get/wishlist`, this.appentTokenHeaders())
  }
  deleteWishlist = (id: any) => {
    return this.http.delete(`${this.serverUrl}/delete/wishlist/${id}`, this.appentTokenHeaders())
  }

  addToCart = (body: any) => {
    return this.http.post(`${this.serverUrl}/add/cart`, body, this.appentTokenHeaders())
  }

  getCartItems = () => {
    return this.http.get(`${this.serverUrl}/get/cart`, this.appentTokenHeaders())
  }
  deleteCartItem = (id: any) => {
    return this.http.delete(`${this.serverUrl}/delete/cart/${id}`, this.appentTokenHeaders())
  }
  incrementQuantity = (id: any, body: any) => {
    return this.http.put(`${this.serverUrl}/cart/increment/${id}`, body, this.appentTokenHeaders())
  }
  decrementQuantity = (id: any, body: any) => {
    return this.http.put(`${this.serverUrl}/cart/decrement/${id}`, body, this.appentTokenHeaders())
  }

}

