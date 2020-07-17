import { ProductViewComponent } from './../product-view/product-view.component';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Role } from '../user.model';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {


  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'example';
  products: Product[];
  selectedProduct: Product;
  filteredPosts: Product[];
  constructor(private productService: ProductService,
    public matDialog: MatDialog, private _snackBar: MatSnackBar,
    private route: ActivatedRoute, private authService: AuthService) {

  }
  get AuthService() {
    return this.authService;
  }
  openDialog(product_id: string) {
    const dialogConfig = new MatDialogConfig();
    this.productService.findById(product_id).subscribe(product => {
      this.matDialog.open(ProductViewComponent, { data: { product } });
    });
  }



  openSnackBar(product: Product) {

    this._snackBar.open('Added to shopping cart', (`Price: €${(this.productService.productPrice(product))} `), {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  add(product: Product): void {
    this.productService.addToCart(product);
    console.log(this.productService.sum);
  }


  ngOnInit(): void {
    this.AuthService.hasPrivilege([Role.Admin])
    this.productService.findAll().subscribe(products => {
      this.products = products.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      this.filteredPosts = this.products;
    });
  }
}
