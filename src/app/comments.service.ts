import { Injectable } from '@angular/core';
import { Comment } from './comments.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs/';


@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    constructor(private http: HttpClient) { }
    create(comment: Comment) {
        return this.http.post<Comment>('/api/addComment', comment, { observe: 'response' })
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

    findAll(): Observable<Comment[]> {
        return this.http.get<Comment[]>('/api/comments')
            .pipe(catchError(this.handleError));
    }
    findById(id: string): Observable<Comment> | undefined {
        return this.http.get<Comment>('/api/comment/' + id)
            .pipe(catchError(this.handleError));
    }
    findByRecipeId(id: string): Observable<Comment[]> | undefined {
        return this.http.get<Comment[]>('/api/comment/recipe/' + id)
            .pipe(catchError(this.handleError));
    }
    update(id: string, comment: Comment) {
        console.log(comment);
        return this.http.put<Comment>('/api/comment/' + id, comment, { observe: 'response' })
            .pipe(catchError(this.handleError));
    }

    remove(id: string) {
        return this.http.delete<Comment>('/api/comment/' + id)
            .pipe(catchError(this.handleError));
    }
}
