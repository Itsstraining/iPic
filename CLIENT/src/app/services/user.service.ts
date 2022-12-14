import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/configs/baseURL';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private Http: HttpClient) { }

  registerUser(email: string, firstName: string, lastName: string): Observable<User> {
    return this.Http.post<User>(URL + `user/register`, {
      email,
      firstName,
      lastName
    })
  }

  getProfile(email: string) {
    return this.Http.get(URL + `user/profile/${email}`);
  }
}
