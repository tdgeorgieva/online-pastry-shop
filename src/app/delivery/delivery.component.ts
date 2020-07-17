import { OrderService } from './../order.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Order } from '../order';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  myDate = new Date();
  sum = this.productService.displaySum();
  productsList =  this.productService.cartProducts;
  user: User;
  isSubmitted = false;
  isSuccessful = false;
  order: Order;
  orderNo = Math.random().toString(36).substring(7);
  isValid = false;

  constructor(private productService: ProductService, private orderService: OrderService,
              private route: ActivatedRoute, private userService: UserService, private authService: AuthService) { }

  finish(): void {
    this.isSubmitted = true;
    this.isSuccessful = true;
    this.productService.deleteCart();
    console.log("finish");
    const order = new Order(this.productsList, this.productService.displaySum(), this.authService.currentUserId);
    this.orderService.create(order).subscribe(u => {
     console.log('Order successfull!');
     // this.router.navigate(['/main-page']);
   });
  }
    ngOnInit(): void { }

}
