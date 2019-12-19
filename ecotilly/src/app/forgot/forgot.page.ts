import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  email: string = '';
  password: string = '';
  error: string = '';
  username: string = '';
  image: number;
  isLoading: boolean = false;

  constructor(private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, public loadingController: LoadingController,
    public alertController: AlertController) {

  }

  ngOnInit() {
  }

  async recover() {
    this.isLoading = true;
    await this.presentLoading("Please wait...");
    this.fireauth.auth.sendPasswordResetEmail(this.email)
      .then(data => {
        console.log(data);
        this.presentToast('Password reset email sent', false, 'bottom', 1000);
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
      this.dismissLoading();
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

  
  private async dismissLoading() {
    console.log("dismiss");
    this.isLoading = false;
  }
  private async presentLoading(msg) {
    console.log("loading");
    const loading = await this.loadingController.create({
      message: msg,
      spinner: "bubbles"
    });
    await loading.present();
    var timer = setInterval(() => {
      if (!this.isLoading) {
        loading.dismiss();
        clearInterval(timer);
        console.log("set dismiss");
      }
    }, 1000);
  }

}
