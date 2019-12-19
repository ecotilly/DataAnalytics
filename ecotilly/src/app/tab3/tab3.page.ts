import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private toastController: ToastController, private authenticationService: AuthenticationService) {}

  
  logout() {
   this.authenticationService.logout();
  }

  addUser() {
    this.presentToast('Not yet supported', false, 'bottom', 1000);
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }
}
