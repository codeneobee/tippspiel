import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): void {
    this.http.post('/api/v1/users/login', {email, password}).subscribe();
  }

  register(email: string, password: string): void {
    this.http.post('/api/v1/users', {email, password}).subscribe();
  }
}
