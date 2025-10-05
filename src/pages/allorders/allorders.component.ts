import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly  authService= inject(AuthService)
  private readonly  checkoutService= inject(CheckoutService)
  userId :string = ''
  ngOnInit(): void {
    this.authService.savedUserdata()
    this.userId= this.authService.userId

this.getUserOrders()
  }



  getUserOrders():void{
    this.checkoutService.getUserOrders(this.userId).subscribe({
      next:(res)=>{
        console.log(res);

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }


}
