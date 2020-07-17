import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs/';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  static nextId = 0;
  private products = [];
  sum: number;
  counterProducts: number;
  cartProducts: Product[] = [];

  constructor(private http: HttpClient) {}
  create(product: Product) {
    return this.http.post<Product>('/api/addProduct', product, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`Status code ${error.status} An error occurred:`, error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
    }

    findAll(): Observable<Product[]> {
      return this.http.get<Product[]>('/api/products')
              .pipe(catchError(this.handleError));
    }
    findById(id: string): Observable<Product> | undefined {
      // return this.posts.find(e => e.id === id);
       return this.http.get<Product>('/api/product/' + id)
             .pipe(catchError(this.handleError));
     }

  remove(id: string) {
    return this.http.delete<Product>('/api/product/' + id)
          .pipe(catchError(this.handleError));
  }

  displayCart(): Product[] {
    return this.cartProducts;
  }
  addToCart(product: Product): void {
    //product.price = parseFloat(product.price);
    this.counterProducts++;
    this.cartProducts.push(product);
    this.sum += product.price;
    console.log(product.price);

  }
  add(product: Product): number {
    return this.sum + product.price;
  }
  productPrice(product: Product): number {
    return product.price;
  }
}
