import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/users';

const authUrl = 'https://my-json-server.typicode.com/lobnazakaria/fake';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get(`${authUrl}/users`);
  }

  getById(id: number) {
      return this.http.get(`${authUrl}/users/${id}`);
  }
  add(body) {
    return this.http.post(`${authUrl}/users`, body);
  }
  update(body, id) {
    return this.http.put(`${authUrl}/users/${id}`, body);
  }
  delete(id) {
    return this.http.get(`${authUrl}/users/${id}`);
  }
}
