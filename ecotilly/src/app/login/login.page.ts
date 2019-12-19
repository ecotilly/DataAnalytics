import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthenticationService) {

  }

  ngOnInit() {
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

  async login() {
    this.isLoading = true;
    await this.presentLoading("Logging in...");
    this.authService.login(this.email, this.password);
    this.dismissLoading();
  }

}
