import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData : any
  userId: string = '';
  constructor(private  httpClient:HttpClient ) { }

  regsiterform(data:object):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , data)
  }

  loginform(data:object):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` ,data)
  }

  savedUserdata(): void {
  if (localStorage.getItem("userToken") != null) {
    let token: any = jwtDecode(localStorage.getItem("userToken")!);
    this.userData = token;

    this.userId = token.id || token._id;

    console.log("userData", this.userData);
    console.log("userId", this.userId);
  }
}

}
