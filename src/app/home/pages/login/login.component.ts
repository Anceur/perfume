import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.validationFormUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]] // تأكد من طول كلمة المرور الأدنى
    });
  }

  validationUserMessage = {
    email: [
      { type: 'required', message: 'L\'email est requis' },
      { type: 'email', message: 'L\'email est invalide' }
    ],
    password: [
      { type: 'required', message: 'Le mot de passe est requis' },
      { type: 'minlength', message: 'Le mot de passe doit comporter au moins 8 caractères' }
    ]
  };

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordToggleIcon = this.passwordType === 'password' ? 'eye-outline' : 'eye-off-outline';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: 'bottom', // Position of the toast
      color: 'danger' // Change color to 'danger' for error messages
    });
    await toast.present();
  }

  LoginUser(): void {
    if (this.validationFormUser.valid) {
      const { email, password } = this.validationFormUser.value;

      // Log in using email and password
      this.authService.loginFireauth(email, password)
        .then(() => {
          this.router.navigate(['/tabs/tab1']);
        })
        .catch(() => {
          this.presentToast('Échec de la connexion. Veuillez vérifier votre adresse e-mail et votre mot de passe.');
        });
    } else {
      this.presentToast('Veuillez entrer des informations valides.');
    }
  }

}
