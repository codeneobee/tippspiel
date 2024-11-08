import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  showRegisterForm = false;
  showLoginForm = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((response) => {
      localStorage.setItem('tp_jwt_token', response.token)
    }, 
    () => {});
  }

  register(): void {
    this.authService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value).subscribe();
  }
}
