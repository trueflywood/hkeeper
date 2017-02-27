/**
 * Created by flywood on 27.02.17.
 */
import {Component}          from '@angular/core';

import {NavController,
    Platform,
    NavParams}              from 'ionic-angular';

@Component({
    templateUrl: 'shops.html'
})
export class Shops {
    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams) {
        console.log('constructor Shops');
        this.platform.ready().then(() => {
            console.log((<any> window));
            if ((<any> window).cordova) {

            }
        });
    }
}
