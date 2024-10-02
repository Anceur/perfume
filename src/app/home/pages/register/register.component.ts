import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordType: string = 'password'; // نوع حقل كلمة المرور (مخفي أو ظاهر)
  passwordToggleIcon: string = 'eye-outline'; // أيقونة تبديل إظهار كلمة المرور
  registerForm!: FormGroup; // نموذج تسجيل المستخدم

  constructor(
    private fb: FormBuilder,
    private firebaseService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
  }

  ngOnInit(): void {
    // إنشاء نموذج التسجيل مع الحقول المطلوبة
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required], // الاسم الأول (إجباري)
      lastName: ['', Validators.required], // اسم العائلة (إجباري)
      email: ['', [Validators.required, Validators.email]], // البريد الإلكتروني (إجباري)
      password: ['', [Validators.required, Validators.minLength(8)]], // كلمة المرور (إجباري)
      terms: [false, Validators.requiredTrue], // قبول الشروط (إجباري)
      newsletter: [false] // الاشتراك في النشرة الإخبارية (اختياري)
    });
  }

  // معالجة التسجيل عند إرسال النموذج
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: 'bottom', // Position of the toast
      color: 'danger' // Change color to 'danger' for error messages
    });
    await toast.present();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.firebaseService.registerFireauth(formData)
        .then(() => {
          this.router.navigate(['/filter']); // Redirect the user after registration
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            this.presentToast('Ce compte existe déjà. Veuillez utiliser une autre adresse e-mail.');
          } else {
            this.presentToast('Erreur de l\'inscription. Veuillez réessayer.');
          }
        });
    } else {
      this.presentToast('Veuillez entrer des informations valides.'); // Optional: Notify user about invalid form
    }
  }
  // تبديل إظهار/إخفاء كلمة المرور
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text'; // إظهار كلمة المرور
      this.passwordToggleIcon = 'eye-off-outline'; // تغيير الأيقونة
    } else {
      this.passwordType = 'password'; // إخفاء كلمة المرور
      this.passwordToggleIcon = 'eye-outline'; // إعادة الأيقونة
    }
  }

  }
