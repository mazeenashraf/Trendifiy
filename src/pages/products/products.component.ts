import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../core/services/categories/Interfaces/Iproducts/iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [RouterLink , CurrencyPipe ,  SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  term:string = ''
  private readonly productsService=inject(ProductsService)
    allproducts:Iproducts [] = []

  ngOnInit(): void {

this.getAllProducts()
  }

        getAllProducts(){
this.productsService.getAllproducts().subscribe({
  next:(res)=>{
this.allproducts = res.data
console.log("allproducts" , this.allproducts);

  },
  error:(err)=>{
    console.log(err);

  }
})
  }

}
