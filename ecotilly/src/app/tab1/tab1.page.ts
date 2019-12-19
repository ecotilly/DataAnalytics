import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('barChart', { static: false }) barChart;
  @ViewChild('topProductsChart', { static: false }) topProductsChart;
  @ViewChild('pieChart', { static: false }) pieChart;
  bars: any;
  pies: any;
  topProducts: any;
  totalOrdersCount: any;
  totalProductsCount: any;
  isLoading: boolean = false;
  subscription: any;

  constructor(private http: HttpClient, private loadingController: LoadingController, private platform:Platform, private toastController: ToastController) { }

  ionViewWillLeave(){
      this.subscription.unsubscribe();
  }

  async ionRefresh(event) {
    console.log('Pull Event Triggered!');
    this.loadStats();
    console.log('Pull Event Completed!');
  }

  rows = [
    {
      "name": "Ethel Price",
      "gender": "female",
      "orders": 22
    },
    {
      "name": "Van Haul",
      "gender": "male",
      "orders": 60
    },
    {
      "name": "Claudine Neal",
      "gender": "female",
      "orders": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "orders": 67
    },
    {
      "name": "Simon Grimm",
      "gender": "male",
      "orders": 28
    }
  ];

  tablestyle = 'bootstrap';

  async ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
    this.isLoading = true;
    await this.presentLoading("Please Wait...");
    this.loadStats();
    this.dismissLoading();
  }

  generateColorArray(num) {
    var colorArray = [];
    for (let i = 0; i < num; i++) {
      colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    return colorArray;
  }

  createBarChart() {
    var promise = new Promise((resolve, reject) => {
      console.log("createBarChart started");
      const my_url = 'https://asia-east2-mailgmailapi.cloudfunctions.net/ecotilly-function/v1/stats/countByDate'
      this.http.get(my_url).subscribe((data: any) => {
        let apiData = {};
        apiData = data;
        console.log(data);
        const colorArray = this.generateColorArray(data.yaxis.length);
        this.bars = new Chart(this.barChart.nativeElement, {
          type: 'bar',
          data: {
            labels: data.xaxis,
            labe: data.xaxis,
            datasets: [{
              label: "count",
              data: data.yaxis,
              backgroundColor: colorArray, // array should have same number of elements as number of dataset
              borderColor: colorArray,// array should have same number of elements as number of dataset
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      },
      error => this.presentToast('bar chart cant be shown: ' + error, false, 'bottom', 1000));
      console.log("createBarChart done");
    });
    return promise;
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

  createPieChart() {
    console.log("createPieChart started");
    const my_url = 'https://asia-east2-mailgmailapi.cloudfunctions.net/ecotilly-function/v1/stats/countByUserName'
    this.http.get(my_url).subscribe((data: any) => {
      let apiData = {};
      apiData = data;
      const colorArray = this.generateColorArray(data.values.length);
      console.log("pie: " + data);
      this.pies = new Chart(this.pieChart.nativeElement, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            label: "users",
            data: data.values,
            backgroundColor: colorArray, // array should have same number of elements as number of dataset
            borderColor: colorArray,// array should have same number of elements as number of dataset
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
    console.log("createPieChart done");
  }

  getTopProducts() {
    const my_url = 'https://asia-east2-mailgmailapi.cloudfunctions.net/ecotilly-function/v1/stats/topProducts'
    this.http.get(my_url).subscribe((data: any) => {
      let apiData = {};
      apiData = data;
      console.log(data);
      const colorArray = this.generateColorArray(data.series.length);
      this.topProducts = new Chart(this.topProductsChart.nativeElement, {
        type: 'horizontalBar',
        data: {
          labels: data.yaxis,
          labe: data.yaxis,
          datasets: [{
            label: "count",
            data: data.series,
            backgroundColor: colorArray, // array should have same number of elements as number of dataset
            borderColor: colorArray,// array should have same number of elements as number of dataset
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
  }

  getTotalOrdersCount() {
    const my_url = 'https://asia-east2-mailgmailapi.cloudfunctions.net/ecotilly-function/v1/stats/orderscount'
    this.http.get(my_url).subscribe((data: any) => {
      let apiData = {};
      apiData = data;
      console.log(data);
      this.totalOrdersCount = data.count;
    });
  }

  getTotalProductsCount() {
    const my_url = 'https://asia-east2-mailgmailapi.cloudfunctions.net/ecotilly-function/v1/stats/productscount'
    this.http.get(my_url).subscribe((data: any) => {
      let apiData = {};
      apiData = data;
      console.log(data);
      this.totalProductsCount = data.count;
    });
  }

  loadStats() {
    console.log("loadStats() started");
    this.createBarChart();
    this.createPieChart();
    this.getTopProducts();
    this.getTotalOrdersCount();
    this.getTotalProductsCount();
    console.log("loadStats() ended");
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
