import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  myToken = localStorage.getItem("userToken")
  constructor( private readonly httpClient:HttpClient ) { }

  chcekout( cartid:String , data:object ):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:4200` ,
       {
    "shippingAddress":data} ,
      {headers:{
        token:this.myToken !
      }}
    )
  }

  getUserOrders(id:String):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}` , {headers:{
      token : this.myToken !
    }})
  }
}
