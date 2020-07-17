import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  myDate = new Date();
  productList: Product[];
  isSubmitted = false;
  isSuccessful = false;
  orderNo = Math.random().toString(36).substring(7);
  finish(): void {
    this.isSubmitted = true;
    this.isSuccessful = true;
  }
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.findAll().subscribe(products => this.productList = products);
  }

}
