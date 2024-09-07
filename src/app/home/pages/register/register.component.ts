import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordType: string = 'password';
  passwordToggleIcon: string = 'eye-outline';


  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue],
      newsletter: [false]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.firebaseService.registerFireauth(formData)
        .then(() => {
          this.router.navigate(['/filter']);
        })
        .catch(error => {
          console.error('Registration Error:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordType = 'password';
      this.passwordToggleIcon = 'eye-outline';
    }
  }
}
