import { UserService } from './../user.service';
import { ProductService } from '../product.service';

import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Order } from '../order';
import { User } from '../user.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  order: Order;
  products = this.productService.cartProducts ;
  user: User;
  pageTitle = 'Shopping List';
  checkout: number = this.productService.counterProducts;
  sum = this.productService.displaySum();
  showImage = false;

  constructor( private productService: ProductService, private orderService: OrderService) { }
  
  ngOnInit(): void {
    // console.log(this.productService.cartProducts.length);
    console.log(this.productService.cartProducts);
    // this.productService.findAll().subscribe(products => this.productService.cartProducts = products);
  }

}
