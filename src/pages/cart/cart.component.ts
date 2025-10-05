import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Icart } from '../../shared/interfaces/Icart/icart';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartderails: Icart = {} as Icart;

  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.GetCart();
  }

  // call apis and get all products
  GetCart(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartderails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // call apis and delete product
  deletproduct(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to remove this product?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteProduct(id).subscribe({
          next: (res) => {
            console.log(res);
            this.GetCart();
            Swal.fire(
              'Deleted!',
              'The product has been removed from your cart.',
              'success'
            );
          },
          error: (err) => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Something went wrong, please try again.',
              'error'
            );
          }
        });
      }
    });
  }

  // call apis and remove cart
  clearCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will clear your entire cart!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res);
            this.GetCart();
            Swal.fire(
              'Cleared!',
              'Your cart has been emptied successfully.',
              'success'
            );
          },
          error: (err) => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Something went wrong, please try again.',
              'error'
            );
          }
        });
      }
    });
  }


// update cart quantity products
updateQuantity(id: string, count: number): void {
  this.cartService.updateCart(id, count).subscribe({
    next: (res) => {
      console.log(res);
      this.GetCart();
      Swal.fire(
        'Updated!',
        'Product quantity has been updated successfully.',
        'success'
      );
    },
    error: (err) => {
      console.log(err);
      Swal.fire(
        'Error!',
        'Could not update product quantity. Please try again.',
        'error'
      );
    }
  });
}

}
