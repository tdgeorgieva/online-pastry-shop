import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }
  create(recipe: Recipe) {
    return this.http.post<Recipe>('/api/addRecipe', recipe, {observe: 'response'})
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
    findAll(): Observable<Recipe[]> {
      return this.http.get<Recipe[]>('/api/recipes')
              .pipe(catchError(this.handleError));
    }
    findById(id: string): Observable<Recipe> | undefined {
      // return this.posts.find(e => e.id === id);
       return this.http.get<Recipe>('/api/recipe/' + id)
             .pipe(catchError(this.handleError));
     }
     remove(id: string) {
      return this.http.delete<Recipe>('/api/recipe/' + id)
            .pipe(catchError(this.handleError));
    }
    findByUserId(id: string): Observable<Recipe[]> | undefined {
      return this.http.get<Recipe[]>('/api/user/recipe/' + id)
          .pipe(catchError(this.handleError));
  }

}
