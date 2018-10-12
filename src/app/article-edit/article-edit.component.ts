import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../Article';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

    author_id = this.authservice.current_user.id;
    title = '';
    content = '';
    article: Article;

    constructor(
        private location: Location,
        private appservice: AppService,
        private authservice: AuthService,
        private activatedrouter: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getArticle().then(() => this.setting()).then(() => this.inputmode());
    }

    getArticle() {
        const id = +this.activatedrouter.snapshot.paramMap.get('id');
        return this.appservice.getDetail(id).then(detail => this.article = detail);
    }

    setting(): void {
        document.getElementById('article-title-input').innerText = this.article.title;
        document.getElementById('article-content-input').innerText = this.article.content;
    }

    back(): void {
        this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
        this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;

        if (this.article.title === this.title && this.article.content === this.content) {
            this.location.back();
        } else {
            const t = confirm('Are you sure? The change will be lost.');
            if (t) {
                this.location.back();
            }
        }
    }

    confirm(): void {
        this.title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
        this.content = (<HTMLInputElement>document.getElementById('article-content-input')).value;

        if (this.title === '' || this.content === '') { alert('fill in the blank'); return; }

        this.article.title = this.title;
        this.article.content = this.content;

        this.appservice.updateArticle(this.article).then(() => this.back());
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

        document.getElementById('article-author-id').hidden = false;
        document.getElementById('article-author').innerText = this.author_id.toString();
        document.getElementById('article-title-input').hidden = true;
        document.getElementById('article-title').hidden = false;
        document.getElementById('article-title').innerText = this.title;
        document.getElementById('article-content-input').hidden = true;
        document.getElementById('article-content').hidden = false;
        document.getElementById('article-content').innerText = this.content;
    }

}
