import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  author_id = this.authservice.userId;
  title = '';
  content = '';

  constructor(
    private location: Location,
    private appservice: AppService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.inputmode();
  }

  back(): void {
    this.location.back();
  }

  confirm(): void {
    this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
    this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;
    if (this.title === '' && this.content === '') { alert('fill in the blank'); return; }
    this.appservice.addArticle(this.author_id, this.title, this.content).then(() => this.back());
  }

  inputmode(): void {
    this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
    this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;

    document.getElementById('article-author').hidden = true;
    document.getElementById('article-title-input').hidden = false;
    document.getElementById('article-title').hidden = true;
    document.getElementById('article-title-input').innerText = this.title;
    document.getElementById('article-content').hidden = true;
    document.getElementById('article-content-input').hidden = false;
    document.getElementById('article-content-input').innerText = this.content;
  }

  previewMode(): void {
    this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
    this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;

    document.getElementById('article-author').hidden = false;
    document.getElementById('article-author-id').innerText = this.author_id.toString();
    document.getElementById('article-title-input').hidden = true;
    document.getElementById('article-title').hidden = false;
    document.getElementById('article-title').innerText = this.title;
    document.getElementById('article-content-input').hidden = true;
    document.getElementById('article-content').hidden = false;
    document.getElementById('article-content').innerText = this.content;
  }
}
