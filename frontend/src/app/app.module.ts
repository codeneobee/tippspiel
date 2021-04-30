import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { HttpClientModule } from '@angular/common/http';

export const routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    LoginModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
