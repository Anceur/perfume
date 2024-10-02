import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-mtpsoublie',
  templateUrl: './mtpsoublie.component.html',
  styleUrls: ['./mtpsoublie.component.scss']
})
export class MtpsoublieComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  resetPassword() {
    if (this.email) {
      this.authService.resetPassword(this.email)
        .then(() => {
          this.message = 'Lien de réinitialisation du mot de passe envoyé!';
        })
        .catch(error => {
          this.message = 'Error: ' + error.message;
        });
    } else {
      this.message = 'S`il vous plaît, mettez une adresse email valide.';
    }
  }
}
