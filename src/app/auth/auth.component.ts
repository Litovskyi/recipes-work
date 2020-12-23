import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  // перемикання з реєстрації на авторизацію і навпаки
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
// відправка даних форми в auth.service.ts
  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    const displayName = authForm.value.displayName;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);

    } else {
      authObs = this.authService.signUp(email, password, displayName);
    }

    authObs
      .subscribe(resData => {
          this.isLoading = false;
          this.router.navigate(['/all-recipes']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        });

    authForm.reset();
  }
}
