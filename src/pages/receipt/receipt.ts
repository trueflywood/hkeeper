import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ReceiptProduct, ReceiptProductSum} from "../../interfaces/product";
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
    products : ReceiptProductSum[] = [];
    sumReceipt: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataBase) {
      this.getPriceList();
  }
  getData():void {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

    onTrash(cod: string, price: number): void {
        this.database.delReceiptRows(cod, price).then(() => {
            this.getPriceList();
        });
    }

    getPriceList(): void {
        this.database.selectCheckList().then((list) => {
            this.products = this.database.getRowsType(list, ReceiptProductSum);
        });
        this.database.getSumReceipt().then((list) => {
            this.sumReceipt = this.database.getRowsSimple<any>(list);
        });
    }
}
