import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient :HttpClient) { }
  myToken : any = localStorage.getItem("userToken")


  //add product to cart
  addtocart(id:string):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
    "productId":id
} , {
  headers:{
    token : this.myToken
  }
}  )
  }


  // get user's products
  getUserCart():Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers : {
        token : this.myToken
      }
    })
  }


  // delete specifac product

  deleteProduct(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      headers : {
        token : this.myToken
      }
    })
  }

  // clear all products from cart

  clearCart():Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers : {
        token : this.myToken
      }
    })
  }

  // update cart product quantity
  updateCart( id :string , newCount : number):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
    "count": newCount
} , {
  headers: {
    token : this.myToken
  }
})
  }

}
