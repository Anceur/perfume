import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service'; // Your Firebase Service
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordType: string = 'password';
  passwordToggleIcon: string = 'eye-outline';

  validationFormUser!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: FirebaseServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validationFormUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]] // Minimum 10 characters
    });
  }

  validationUserMessage = {
    email: [
      { type: 'required', message: 'L\'email est requis' },
      { type: 'email', message: 'L\'email est invalide' }
    ],
    password: [
      { type: 'required', message: 'Le mot de passe est requis' },
      { type: 'minlength', message: 'Le mot de passe doit comporter au moins 8 caractères' } // Updated to 10 characters
    ]
  };

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordType = 'password';
      this.passwordToggleIcon = 'eye-outline';
    }
  }

  LoginUser(): void {
    if (this.validationFormUser.valid) {
      const { email, password } = this.validationFormUser.value;

      // Firebase email/password authentication
      this.authService.loginFireauth(email, password)
        .then(() => {
          // Navigate to a new page upon successful login
          this.router.navigate(['/tabs/tab1']);
        })
        .catch(err => {
          console.error('Login Error:', err);
          alert('Login failed. Please check your email and password.');
        });
    } else {
      console.log('Form is invalid');
      alert('Please enter valid credentials.');
    }
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook()
      .then(() => {
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(err => {
        console.error('Facebook Login Error:', err);
      });
  }

  GoogleAuth(): void {
    this.authService.GoogleAuth()
      .then(() => {
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(err => {
        console.error('Google Auth Error:', err);
      });
  }
}
