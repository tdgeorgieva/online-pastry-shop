import { CommentsService } from './../comments.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from '../comments.model';
import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';
import { User, Role } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  comments: Comment[];
  recipe: Recipe;
  user: User;
  stars: 5;
  comment: Comment;
  adminRole: Role = Role.Admin;
  constructor( private route: ActivatedRoute, private commentsService: CommentsService, private authService: AuthService) { }
  deleteComment(id: string): void {
    console.log('delete');
    this.commentsService.remove(id).subscribe(() => this.commentsService.findByRecipeId(this.recipe._id).subscribe(
      comments => this.comments = comments));
  }
  get AuthService() {
    return this.authService;
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.recipe = data.recipe,
      console.log(data);
    });
    this.commentsService.findByRecipeId(this.recipe._id).subscribe(comments => this.comments = comments);
  }

}
