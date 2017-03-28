import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Product} from "../../interfaces/product";
import {DataBase} from "../../services/database";

/*
  Generated class for the Receipt page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html'
})
export class ReceiptPage {
    products : Product[] = [];
    sumReceipt: number[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataBase) {
      if ((<any> window).cordova) {
          this.database.selectCheckList().then((list) => {
              this.products = this.database.getRowsType(list, Product);
          });
          this.database.getSumReceipt().then((list) => {
              this.sumReceipt = this.database.getRowsSimple<number>(list);
              console.log('this.sumReceipt');
              console.log(this.sumReceipt);
          });

      }
  }
  getData():void {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

}
