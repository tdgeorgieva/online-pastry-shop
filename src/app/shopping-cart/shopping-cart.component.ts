import { ProductService } from '../product.service';

import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  productList: Product[];
  product: Product;
  pageTitle: string = 'Shopping List';
  checkout: number = this.productService.counterProducts;

  showImage: boolean = false;

  constructor(private productService: ProductService) { }
  
  get products(): Product[] {
    return this.productService.cartProducts;
  }

  ngOnInit(): void {
    this.productService.findAll().subscribe(products => this.productList = products);
    console.log(this.productService.add(this.product));
  }

}
