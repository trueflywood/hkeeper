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


@Component({
    templateUrl: 'product.html'
})
export class ProductComponent {
    product: Product;
    price: number;

    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public backend: BackendService) {
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


    }


}

