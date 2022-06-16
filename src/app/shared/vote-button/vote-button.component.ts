import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { throwError } from 'rxjs';
import { PostModel } from '../models/post.model';
import { VotePayload } from './vote-playload';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel | any;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string | any;
  downvoteColor: string | any;

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService, private snackBar: MatSnackBar) {

    this.votePayload = {
      voteType: -1,
      postId: -1
    }
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upVotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downVotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.snackBar.open("Vote Failed", "Dismiss", {
        duration : 2000,
        panelClass : ['failure-snackbar']
        });      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}