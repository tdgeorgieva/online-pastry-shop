import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Role } from '../user.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  isSubmitted = false;
  isSuccessful = false;
  productForm: FormGroup;
  productName: string;
  productCode: string;
  releaseDate: Date;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  adminRole: Role = Role.Admin;
  constructor(private productService: ProductService, private authService: AuthService) { }
  get productFormControl() {
    return this.productForm.controls;
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmitted = true;
    console.warn(this.productForm.value);
    let product = new Product(this.productForm.controls.productName.value,
      this.productForm.controls.productCode.value,
      this.productForm.controls.releaseDate.value,
      this.productForm.controls.description.value,
      this.productForm.controls.price.value,
      this.productForm.controls.starRating.value,
      this.productForm.controls.imageUrl.value);
    this.productService.create(product).subscribe(res => {
      this.isSuccessful = true;
      // res.headers.keys();
      // this.router.navigate([res.headers.get('location')]);
    });
  }
  addProduct() {
    console.log("pretend adding");
  }
  get AuthService() {
    return this.authService;
  }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl (this.productName, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      productCode: new FormControl(this.productCode, [
        Validators.required,
        Validators.maxLength(7),
        Validators.minLength(7),
      ]),
      releaseDate: new FormControl (this.releaseDate, [
        Validators.required
      ]),
      description: new FormControl (this.description, [
        Validators.maxLength(200),
      ]),
      price: new FormControl (this.price, [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(4),
      ]),
      starRating: new FormControl (this.starRating, Validators.pattern('[1-5]')),
      imageUrl: new FormControl (this.imageUrl, [
        Validators.required
      ]),
    });
  }
}
