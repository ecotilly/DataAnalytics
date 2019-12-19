import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean = false;

  constructor(public loadingController: LoadingController) { }

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