import { ProductService } from './../product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private productService: ProductService, 
  //             private route: ActivatedRoute) {}
  // product: Product;

  // horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  // products: Product[];
  // getPrice(): number {
  //   return this.data.product.price;
  // }
  // openSnackBar(product_id: number) {

  //   this._snackBar.open('Added to shopping cart', `Price: ${this.getPrice()}`, {
  //     duration: 1000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  //   // console.log(`Price: ${this.productService.getPrice(product_id)}`);
  // }
  ngOnInit(): void {
   //  this.route.data.subscribe(data => this.product = data.product);
  }

}
