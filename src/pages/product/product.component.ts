/**
 * Created by flywood on 26.02.17.
 */
import { Component } from '@angular/core';

import {NavController, Platform, NavParams} from 'ionic-angular';

@Component({
    templateUrl: 'product.html'
})
export class Product {
    product: string;

    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams){
        console.log('constructor Product');
        // If we navigated to this page, we will have an item available as a nav param
        this.product = navParams.get('product');
        console.log(this.product);

        this.platform.ready().then(() => {
            console.log((<any> window));
            if ((<any> window).cordova) {

            }
        });
    }

    checkPrice(): void {

    }

    addToReceipt(): void {

    }


}

