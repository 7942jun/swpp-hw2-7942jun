import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean;
  userId: number;

  users: User[];
  usersUrl = 'api/user';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get(this.usersUrl).toPromise().catch(this.handleError)
      .then(users => this.users = users);
  }

  getUserNamebyId(id: number): User {
    const url = this.usersUrl + '/' + id;
    return this.users.find( user => user.id === id);
  }

  checkId(email: string, password: string): Promise<User> {
    return this.getUsers()
      .then(user => Promise.resolve(this.users.find(
        _user => _user.email === email && _user.password === password
      )));
  }

  login(id: number): void {
    this.isLogin = true;
    this.userId = id;
  }

  logout(): void {
    this.isLogin = false;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
