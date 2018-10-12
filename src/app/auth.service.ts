import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean;
  current_user: User;

  users: User[];
  usersUrl = 'api/user';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(id: number) {
      const url = this.usersUrl + '/' + id;
      return this.http.get(url).toPromise();
  }

  getUsers() {
    return this.http.get(this.usersUrl).toPromise().catch(this.handleError)
      .then(users => this.users = users);
  }

  getUserbyId(id: number): User {
    const url = this.usersUrl + '/' + id;
    return this.users.find( user => user.id === id);
  }

  Sign(islogin: boolean) {
    const url = 'api/user/' + this.current_user.id;
    this.current_user.signed_in = islogin;
    this.isLogin = islogin;
    return this.http.put(url, this.current_user).toPromise();
  }

  checkId(email: string, password: string): Promise<User> {
    return this.getUsers()
      .then(user => Promise.resolve(this.users.find(
        _user => _user.email === email && _user.password === password
      )))
        .then(res => this.current_user = res);
  }

  logout(): void {
    this.Sign(false);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
