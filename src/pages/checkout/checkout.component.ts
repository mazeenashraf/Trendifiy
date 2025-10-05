import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
private readonly checkoutService = inject(CheckoutService)
private readonly activatedRoute = inject(ActivatedRoute)
private readonly formBuilder = inject(FormBuilder)
checkoutform!:FormGroup
cartId : string =''
  ngOnInit(): void {

this.initform()
this.getCartId()
  }

initform():void{
     this.checkoutform = new FormGroup({
    details : new FormControl(null , [Validators.required]),
    phone : new FormControl(null , [Validators.required]),
    city : new FormControl(null , [Validators.required])
  })
}


getCartId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(p)=>{
      this.cartId = p.get("id") !
    }
  })
}



  checkform():void{
    this.checkoutService.chcekout(this.cartId , this.checkoutform.value).subscribe({
      next:(res)=>{
        console.log(res);
        open(res.session.url , "_self")
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
