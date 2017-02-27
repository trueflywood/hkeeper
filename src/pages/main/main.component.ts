/**
 * Created by flywood on 04.02.17.
 */
import { Component }                from '@angular/core';

import { NavController, Platform }  from 'ionic-angular';
import {Product}                    from "../product/product.component";

@Component({
    templateUrl: 'main.html'
})
export class Main {
    private scanSettings: any;
    private scanPicker: any;
    public cod: string;
    public type: string;


    constructor(public navCtrl: NavController, public platform: Platform){
        console.log('constructor');
        this.platform.ready().then(() => {
            console.log((<any> window));
            if ((<any> window).cordova) {
                Scandit.License.setAppKey("zB2MVDAgEeOHO1XsgH/05ScZE8eTIsLCh7m5XQywucs");
                this.scanSettings = new Scandit.ScanSettings();
                this.scanSettings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
                //this.scanSettings.setSymbologyEnabled(Scandit.Barcode.Symbology.UPC12, true);
                //this.scanSettings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN8, true);
                this.scanPicker = new Scandit.BarcodePicker(this.scanSettings);

                console.log('start Geo');
                console.log('start Geo3');
                if (navigator.geolocation) {
                    var options = {
                        enableHighAccuracy: true
                    };
                    console.log('start Geo5');
                    navigator.geolocation.getCurrentPosition(position=> {
                        console.info('using navigator');
                        console.info(position.coords.latitude);
                        console.info(position.coords.longitude);
                    }, error => {
                        console.log(error);
                    }, options);
                }
            }
        });
    }

    scan(): void {
        if ((<any> window).cordova) {
            this.scanPicker.show((res: any) => {
                console.log(("Success: "));
                console.log(res);
                this.type = res.newlyRecognizedCodes[0].symbology;
                this.cod = res.newlyRecognizedCodes[0].data;

                // TODO go to the next page
            }, null, (error: any) => {
                console.log("Error: ");
                console.log(error);
            });

        } else {
            this.navCtrl.push(Product, {
                product: {
                    cod: "4005808837359"
                }
            });
        }

    }
}

