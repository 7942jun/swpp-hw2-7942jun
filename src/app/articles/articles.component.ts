import { Component, OnInit } from '@angular/core';
import { Article } from '../Article';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(
    private appservice: AppService,
    private router: Router,
    private authservice: AuthService
  ) { }

  articles: Article[];

  ngOnInit() {
    this.getArticles();
  }

  article_detail(id: number) {
      this.router.navigate(['/articles/' + id]);
  }

  getArticles(): void {
    this.appservice.getArticle().then(articles => this.articles = articles);
  }

  create_article() {
    this.router.navigate(['/articles/create']);
  }

  getUsername(id: number): string {
    return this.authservice.getUserbyId(id).name;
  }
}
