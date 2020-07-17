import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  productName: string;
  productCode: string;
  releaseDate: Date;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  constructor(private productService: ProductService) { }
  get productFormControl() {
    return this.productForm.controls;
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    
    console.warn(this.productForm.value);
    let product = new Product(this.productForm.controls.productName.value,
      this.productForm.controls.productCode.value,
      this.productForm.controls.releaseDate.value,
      this.productForm.controls.description.value,
      this.productForm.controls.price.value,
      this.productForm.controls.starRating.value,
      this.productForm.controls.imageUrl.value);
    this.productService.create(product).subscribe(res => {
      // res.headers.keys();
      // this.router.navigate([res.headers.get('location')]);
    });
  }
  addProduct() {
    console.log("pretend adding");
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
