import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@maids/api-interfaces';
import {
  UserResponse,
  UsersResponse,
} from 'libs/api-interfaces/src/lib/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  model = 'users';

  constructor(private _http: HttpClient) {}

  all(page = 1) {
    return this._http.get<UsersResponse>(`${this.getUrl()}?page=${page}`);
  }

  find(id: number) {
    return this._http.get<UserResponse>(this.getUrlWithId(id));
  }

  create(user: User) {
    return this._http.post(this.getUrl(), user);
  }

  update(user: User) {
    return this._http.put(this.getUrlWithId(user.id), user);
  }

  delete(user: User) {
    return this._http.delete(this.getUrlWithId(user.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
