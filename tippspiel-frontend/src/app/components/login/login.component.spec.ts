import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {AuthService} from '../../services/auth/auth.service';
import {jest} from '@jest/globals';
import {LoginModule} from './login.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModule]
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
});
