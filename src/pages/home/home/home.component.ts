import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Icategory } from '../../../core/services/categories/Interfaces/Icategory/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../core/services/products/products.service';
import { Iproducts } from '../../../core/services/categories/Interfaces/Iproducts/iproducts';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink , CurrencyPipe ,  SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  term : string = '';
 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['  <i class=" mychev fa-solid fa-chevron-left"></i>  ', '    <i class=" mychev fa-solid fa-chevron-right"></i> '],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


  allCategories: Icategory[] = [];
  allproducts:Iproducts [] = []

  private readonly categoriesService = inject(CategoriesService);
   private readonly  productsService=inject(ProductsService)

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts()
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
        console.log(this.allCategories);
      },
      error: (err) => console.log(err)
    });
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




  // عدد المنتجات اللي هنعرضه
visibleCount: number = 8;

// دالة ترجّع الجزء الظاهر بس
get visibleProducts() {
  return this.allproducts.slice(0, this.visibleCount);
}

// دالة تزود العدد
loadMore() {
  this.visibleCount += 10;
}

}
