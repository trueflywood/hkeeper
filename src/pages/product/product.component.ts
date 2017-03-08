/**
 * Created by flywood on 26.02.17.
 */
import {Component}          from '@angular/core';

import {
    NavController,
    Platform,
    NavParams,
    LoadingController
}                           from 'ionic-angular';
import {BackendService}     from '../../services/backend';
import {Product}            from '../../interfaces/product';
import {DataBase}           from "../../services/database";

@Component({
    templateUrl: 'product.html'
})
export class ProductComponent {
    product: Product;
    price: number;

    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public backend: BackendService, public database: DataBase) {
        console.log('constructor Product');
        // If we navigated to this page, we will have an item available as a nav param
        this.product = new Product(navParams.get('product'));




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
        console.log('res2');
        console.log(res2);
        res2.then((rrr) => {
            console.log('rrr');
            console.log(rrr);
        },(err) => {
            console.log('err');
            console.log(err);
        });

        this.database.selectCheckList().then((list)=>{
            console.log('list');
            console.log(list);
            console.log(list.rows.item(0));

        })

    }
}

