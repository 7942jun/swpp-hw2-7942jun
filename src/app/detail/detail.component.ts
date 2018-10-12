import { Component, OnInit } from '@angular/core';
import { Comment } from '../Comment';
import { AppService } from '../app.service';
import { Article } from '../Article';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private appservice: AppService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private authservice: AuthService
  ) { }

  article: Article;
  comments: Comment[];

  id: number;
  user_id: number;
  comment: string;

  ngOnInit() {
    this.getArticle();
    this.getComments();
  }

  setting(): void {
    this.user_id = this.authservice.userId;

    document.getElementById('article-author-id').innerText = this.article.author_id.toString();
    document.getElementById('article-title').innerText = this.article.title;
    document.getElementById('article-content').innerText = this.article.content;
  }

  getArticle(): void {
    this.id = +this.activeroute.snapshot.paramMap.get('id');
    this.appservice.getDetail(this.id).then(detail => this.article = detail).then(() => this.setting());
  }

  getComments(): void {
    this.appservice.getComment().then(comment => this.comments = comment);
  }

  confirm_comment(): void {
    this.comment = (<HTMLInputElement>document.getElementById('new-comment-content-input')).value;
    (<HTMLInputElement>document.getElementById('new-comment-content-input')).value = '';
    this.appservice.addComment(this.id, this.user_id, this.comment);
  }

  delete_comment(id: number): void {
    this.appservice.deleteComment(id);
  }

  edit_comment(comment: Comment): void {
    const new_content = prompt('Enter new comment');
    comment.content = new_content;
    this.appservice.updateComment(comment);
  }

  delete_article(): void {
    this.appservice.deleteArticle(this.id).then(() => this.getback());
  }

  getback(): void {
    this.router.navigate(['/articles']);
  }
}
