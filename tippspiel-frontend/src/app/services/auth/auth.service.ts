import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/v1/users/login', { email, password }).pipe(
      shareReplay()
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post('/api/v1/users', { email, password }).pipe(
      shareReplay()
    );
  }
}
