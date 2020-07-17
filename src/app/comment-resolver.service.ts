
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root'
})
export class CommentResolverService implements Resolve<any>{

  constructor(private commentService: CommentsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return this.commentService.findById(id);


  }
}
