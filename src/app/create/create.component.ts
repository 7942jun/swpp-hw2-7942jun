import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  author_id = this.authservice.current_user.id;
  title = '';
  content = '';

  constructor(
    private location: Location,
    private appservice: AppService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inputmode();
  }

  back(): void {
    this.router.navigate(['articles']);
  }

  confirm(): void {
    this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
    this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;
    if (this.title === '' && this.content === '') { return; }
    this.appservice.addArticle(this.author_id, this.title, this.content)
        .then(result => this.router.navigate(['articles/' + result.id]));
  }

  inputmode(): void {
    this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
    this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;

    document.getElementById('article-author-id').hidden = true;
    document.getElementById('title-input').style.display = 'block';
    document.getElementById('title').style.display = 'none';
    document.getElementById('article-title-input').innerText = this.title;
    document.getElementById('content').style.display = 'none';
    document.getElementById('content-input').style.display = 'block';
    document.getElementById('article-content-input').innerText = this.content;
  }

  previewMode(): void {
    this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
    this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;

    document.getElementById('article-author-id').hidden = false;
    document.getElementById('article-author').innerText = this.author_id.toString();
    document.getElementById('title-input').style.display = 'none';
    document.getElementById('title').style.display = 'block';
    document.getElementById('article-title').innerText = this.title;
    document.getElementById('content-input').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('article-content').innerText = this.content;
  }
}
