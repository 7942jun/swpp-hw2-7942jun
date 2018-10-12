import { Injectable } from '@angular/core';
import { Article } from './Article';
import { Comment } from './Comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  private articlesUrl = 'api/articles';
  private commentsUrl = 'api/comments';

  getArticle(): Promise<Article[]> {
    return this.http.get(this.articlesUrl).toPromise().catch(this.handleError);
  }

  getDetail(id: number): Promise<Article> {
    const url = this.articlesUrl + '/' + id;
    return this.http.get(url).toPromise().catch(this.handleError);
  }

  getComment(): Promise<Comment[]> {
    return this.http.get(this.commentsUrl).toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  addArticle(author_id: number, title: string, content: string): Promise<Article> {
    return this.http
      .post<Article>(this.articlesUrl, {author_id: author_id, title: title, content: content}, httpOptions)
      .toPromise()
      .then(res => res as Article)
      .catch(this.handleError);
  }

  addComment(article_id: number, author_id: number, content: string): Promise<Article> {
    return this.http
      .post<Comment>(this.commentsUrl, {article_id: article_id, author_id: author_id, content: content}, httpOptions)
      .toPromise()
      .then(res => res as Comment)
      .catch(this.handleError);
  }

  updateArticle(article: Article): Promise<Article> {
    return this.http.put(this.articlesUrl, article, httpOptions).toPromise()
      .catch(this.handleError);
  }

  updateComment(comment: Comment): Promise<Comment> {
    const url = this.articlesUrl + '/' + comment.id;

    return this.http.put(url, comment, httpOptions).toPromise()
      .catch(this.handleError);
  }

  deleteComment(id: number): Promise<Comment> {
    const url = this.commentsUrl + '/' + id;

    return this.http.delete<Comment>(url, httpOptions).toPromise().catch(this.handleError);
  }

  deleteArticle(id: number): Promise<Article> {
    const url = this.articlesUrl + '/' + id;

    return this.http.delete<Article>(url, httpOptions).toPromise().catch(this.handleError);
  }
}
