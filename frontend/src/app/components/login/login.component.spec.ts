import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth/auth.service';
import { jest } from '@jest/globals';
import { LoginModule } from './login.module';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModule, HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('LoginForm', () => {
    it('should call login service with values defined in login form', () => {
      component.showLoginForm = true;
      fixture.detectChanges();

      jest.spyOn(authService, 'login').mockReturnValue(EMPTY);
      const loginField = fixture.nativeElement.querySelector('#email-input');
      loginField.value = 'User';
      loginField.dispatchEvent(new Event('input'));

      const passwordField = fixture.nativeElement.querySelector('#password-input');
      passwordField.value = 'P4ssword';
      passwordField.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('#login-button');
      loginButton.click();
      fixture.detectChanges();

      expect(authService.login).toHaveBeenCalledWith('User', 'P4ssword');
    });

    it('should switch to login form if login button on home page is clicked', () => {
      let loginForm = fixture.nativeElement.querySelector('#login-form')
      expect(loginForm).toBeNull();
      const registerButton: HTMLButtonElement = fixture.nativeElement.querySelector('#switch-login-button');
      registerButton.click();
      fixture.detectChanges();

      loginForm = fixture.nativeElement.querySelector('#login-form')
      expect(loginForm).not.toBeNull();
    });
  })

  describe('RegisterForm', () => {
    it('should call login service register with values defined in form', () => {
      component.showRegisterForm = true;
      fixture.detectChanges();
      jest.spyOn(authService, 'register').mockReturnValue(EMPTY);
      const loginField = fixture.nativeElement.querySelector('#register-email-input');
      loginField.value = 'User';
      loginField.dispatchEvent(new Event('input'));

      const passwordField = fixture.nativeElement.querySelector('#register-password-input');
      passwordField.value = 'P4ssword';
      passwordField.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('#register-button');
      loginButton.click();
      fixture.detectChanges();

      expect(authService.register).toHaveBeenCalledWith('User', 'P4ssword');
    });

    it('should switch to register form if register register button is clicked', () => {
      let registerForm = fixture.nativeElement.querySelector('#register-form');
      expect(registerForm).toBeNull();
      const registerButton: HTMLButtonElement = fixture.nativeElement.querySelector('#switch-register-button');
      registerButton.click();
      fixture.detectChanges();

      registerForm = fixture.nativeElement.querySelector('#register-form');
      expect(registerForm).not.toBeNull();
    });
  });

  describe('login', () => {

    class LocalStorageMock {
      store: {};
      get length() {
        return 1
      }

      constructor() {
        this.store = {}
      }

      clear(): void {
        this.store = {}
      }

      getItem(key: string) {
        return this.store[key] || null;
      }

      setItem(key: string, value: string) {
        this.store[key] = value.toString()
      }

      removeItem(key: string) {
        delete this.store[key]
      }

      key(index: number) {
        return null;
      }
    }

    beforeEach(() => {
      global.localStorage = new LocalStorageMock;
    })

    it('should set returned token in local storage', () => {
      jest.spyOn(authService, 'login').mockReturnValue(of({
        token: 'SomeToken'
      }))
      component.loginForm.setValue({ 'email': 'TEST', 'password': 'TEST' });

      component.login()

      expect(authService.login).toHaveBeenCalledWith('TEST', 'TEST');
      expect(localStorage.getItem('tp_jwt_token')).toEqual('SomeToken');

    })
  })
});
