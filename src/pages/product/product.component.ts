/**
 * Created by flywood on 26.02.17.
 */
import {Component}          from '@angular/core';

import {
    NavController,
    Platform,
    NavParams,
    LoadingController, AlertController
}                           from 'ionic-angular';
import {BackendService}     from '../../services/backend';
import {Product, ReceiptProduct}            from '../../interfaces/product';
import {DataBase}           from "../../services/database";
import {ReceiptPage} from "../receipt/receipt";

@Component({
    templateUrl: 'product.html'
})
export class ProductComponent {
    product: ReceiptProduct;
    price: number;
    checkPriceFlag: boolean =false;
    addToReceiptFlag: boolean = false;
    constructor(
        public navCtrl: NavController,
        public platform: Platform,
        public navParams: NavParams,
        public backend: BackendService,
        public database: DataBase,
        public alertCtrl: AlertController
    ) {
        console.log('constructor Product');
        // If we navigated to this page, we will have an item available as a nav param
        this.product = new ReceiptProduct(navParams.get('product'));

        console.log(this.product);


        /*this.platform.ready().then(() => {
            console.log((<any> window));
            if ((<any> window).cordova) {
                backend.getShopList(this.product.coords).subscribe((data) => {
                 console.log('data');
                 console.log(data);
                });
            }
        });*/
    }

    checkPrice(): void {

    }

    addToReceipt(): void {

        let res2 = this.database.addProduct(this.product);
        res2.then((rrr) => {
            this.navCtrl.push(ReceiptPage);
        },(err) => {
            console.log('err');
            console.log(err);
        });

        this.database.selectCheckList().then((list)=>{
            console.log('list');
            console.log(list);
        })

    }

    showPrompt() {
        let prompt = this.alertCtrl.create({
            title: 'Количество',
            message: "Ведите количество товара ",
            cssClass: 'count-inputs',
            inputs: [
                {
                    name: 'count',
                    placeholder: 'Кол-во',
                    type: 'number',
                    value: this.product.count.toString()
                }
            ],
            buttons: [
                {
                    text: 'Отмена',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                }, {
                    text: 'Сохранить',
                    handler: (data) => {
                        console.log('data');
                        console.log(data);
                        console.log('this.product');
                        console.log(this.product);
                        this.product.count = data.count;
                        console.log(this.product);
                        this.addToReceipt();

                    }
                }
            ]
        });
        prompt.present();
    }



}

