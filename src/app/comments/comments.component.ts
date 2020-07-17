
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../comments.model';
import { CommentsService } from '../comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comment: Comment;
  user_id: string;
  recipe_id: string;

  userName: string;
  text: string;
  comments: Comment[];
  max: 5;
  rating: number;
  // rate: number = this.rating;

  commentForm = new FormGroup({
    userName: new FormControl(this.userName, [
      Validators.required,
    ]),
    text: new FormControl(this.text, [
      Validators.required
    ]),
    rating: new FormControl(this.rating, [
      Validators.pattern('[1-5]')
    ])
  });
  constructor(private commentsService: CommentsService, private router: Router, private route: ActivatedRoute,
              private location: Location) { }

  get commentFormControl() {
    return this.commentForm.controls;
  }
  onSubmit() {
    console.warn(this.commentForm.value);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(this.recipe_id, this.user_id, "blala")
      const comment = new Comment(this.commentForm.controls.userName.value,
        this.commentForm.controls.text.value,
        this.recipe_id,
        this.user_id,
        this.commentForm.controls.rating.value);
      comment.recipe_id = this.recipe_id;
      comment.user_id = this.user_id;
      console.log(comment);
      if (id) {
        this.commentsService.update(id, comment).subscribe(res => {
          res.headers.keys();
          this.router.navigate([res.headers.get('location')]);
        });

      } else {
        this.commentsService.create(comment).subscribe(res => { });
      }

    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.route.data.subscribe(data => {
          this.comment = data.comment;
          this.recipe_id = this.comment.recipe_id;
          this.user_id = this.comment.user_id;
          this.commentForm.patchValue({
            name: this.comment.name,
            text: this.comment.text,
            rating: this.comment.rating,
          });
        });
    } else {
      const recipeData = this.location.getState();
      this.recipe_id = recipeData['recipe_id'];
      this.user_id = recipeData['user_id'];
      console.log(recipeData, recipeData['recipe_id'], recipeData['user_id']);
    }});
  }
}
