import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../shared/interfaces/Ibrands/ibrands';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [NgFor , ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit  {
  private readonly brandsService = inject(BrandsService)
  allBrands : Ibrands [] = []
  ngOnInit(): void {
this.getAllBrands()
  }
getAllBrands():void{
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      this.allBrands = res.data

    },

    error:(err)=>{
      console.log(err);

    }
  })
}

}
