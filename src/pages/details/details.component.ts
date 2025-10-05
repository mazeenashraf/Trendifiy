import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../core/services/categories/Interfaces/Iproducts/iproducts';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
  standalone:true
})
export class DetailsComponent implements OnInit {
  productDetails : Iproducts = {} as Iproducts
  mainimg :string =''

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService= inject(ProductsService)
  private readonly cartService= inject(CartService)


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId = p.get("id")
        this.productsService.getSpecifproducts(productId).subscribe({
          next:(res)=>{
            this.productDetails = res.data
            this.mainimg = res.data.imageCover

          },
          error:(err)=>{
            console.log(err);

          }
        })
      }
    })

  }

  // call apis => cartServices and add products to cart

addcart(myid: string): void {
  this.cartService.addtocart(myid).subscribe({
    next: (res) => {
      if (res.status === "success") {
        Swal.fire({
          iconHtml: '<i class="fa-solid fa-check" style="color: black; font-size: 2.5rem;"></i>',
          title: 'Success',
          text: res.message,
          confirmButtonText: 'OK'
        });
      }
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error?.message || 'Something went wrong. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  });
}





}
