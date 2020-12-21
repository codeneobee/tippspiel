import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {AuthService} from '../../services/auth/auth.service';
import {jest} from '@jest/globals';
import {LoginModule} from './login.module';
import {HttpClientModule} from '@angular/common/http';

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

  it('should call login service with values defined in form', () => {
    jest.spyOn(authService, 'login').mockReturnThis();
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

  it('should switch to register form if register register button is clicked', () => {
    let registerForm = fixture.nativeElement.querySelector('#register-form');
    let loginForm = fixture.nativeElement.querySelector('#login-form')
    expect(registerForm).toBeNull();
    expect(loginForm).not.toBeNull();
    const registerButton: HTMLButtonElement = fixture.nativeElement.querySelector('#switch-register-button');
    registerButton.click();
    fixture.detectChanges();

    registerForm = fixture.nativeElement.querySelector('#register-form');
    loginForm = fixture.nativeElement.querySelector('#login-form')
    expect(registerForm).not.toBeNull();
    expect(loginForm).toBeNull();
  });

  it('should call login service register with values defined in form', () => {
    component.showRegisterForm = true;
    fixture.detectChanges();
    jest.spyOn(authService, 'register').mockReturnThis();
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
});
