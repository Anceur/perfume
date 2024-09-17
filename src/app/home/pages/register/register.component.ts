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
  passwordType: string = 'password'; // نوع حقل كلمة المرور (مخفي أو ظاهر)
  passwordToggleIcon: string = 'eye-outline'; // أيقونة تبديل إظهار كلمة المرور
  registerForm!: FormGroup; // نموذج تسجيل المستخدم

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseServiceService,
    private router: Router
  ) {}

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
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.firebaseService.registerFireauth(formData)
        .then(() => {
          this.router.navigate(['/filter']); // توجيه المستخدم بعد التسجيل
        })
        .catch(error => {
          console.error('Registration Error:', error);
          alert(error.message); // عرض رسالة خطأ للمستخدم
        });
    } else {
      console.log('Form is invalid'); // إذا كان النموذج غير صحيح
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
