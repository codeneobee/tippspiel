import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  login(user: string, password: string): void {
    console.log(`login called ${user} ${password}`);
  }
}
