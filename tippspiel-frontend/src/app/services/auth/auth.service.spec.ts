import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EMPTY} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient)
  });

  describe('login', () => {
    it('should call backend with correct values', () => {
      jest.spyOn(http, 'post').mockReturnValue(EMPTY);
      service.login('USER', 'PASSWORD');

      expect(http.post).toHaveBeenCalledWith('/api/v1/users/login', {email: 'USER', password: 'PASSWORD'});
    });
  });

  describe('register', () => {
    it('should call backend with correct values', () => {
      jest.spyOn(http, 'post').mockReturnValue(EMPTY);
      service.register('USER', 'PASSWORD');

      expect(http.post).toHaveBeenCalledWith('/api/v1/users', {email: 'USER', password: 'PASSWORD'});
    });
  });
});
