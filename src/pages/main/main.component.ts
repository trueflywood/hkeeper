/**
 * Created by flywood on 04.02.17.
 */
import { Component }            from '@angular/core';

import {NavController,
    Platform,
    LoadingController}          from 'ionic-angular';
import {ProductComponent}       from '../product/product.component';
import {SCANDIT_KEY}            from '../../app/config';
import {ICoords}                from '../../interfaces/product';

@Component({
    templateUrl: 'main.html'
})
export class Main {
    private scanSettings: any;
    private scanPicker: any;
    public cod: string;
    public type: string;
    coords: ICoords;


    constructor(public navCtrl: NavController, public platform: Platform, public loadingCtrl: LoadingController){
        console.log('constructor');
        this.platform.ready().then(() => {
            console.log((<any> window));
            if ((<any> window).cordova) {
                Scandit.License.setAppKey(SCANDIT_KEY);
                this.scanSettings = new Scandit.ScanSettings();
                this.scanSettings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
                //this.scanSettings.setSymbologyEnabled(Scandit.Barcode.Symbology.UPC12, true);
                //this.scanSettings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN8, true);
                this.scanPicker = new Scandit.BarcodePicker(this.scanSettings);


                if (navigator.geolocation) {
                    let loading = this.loadingCtrl.create({
                        content: 'Получение координат...'
                    });
                    loading.present();
                    let options = {
                        enableHighAccuracy: true
                    };
                    console.log('start Geo5');
                    navigator.geolocation.getCurrentPosition(position=> {
                        console.info('using navigator');
                        console.info(position.coords.latitude);
                        console.info(position.coords.longitude);
                        this.coords = position.coords;
                        loading.dismiss();

                    }, error => {
                        console.log(error);
                        loading.dismiss();
                    }, options);
                }
            }
        });
    }

    scan(): void {
        if ((<any> window).cordova) {
            this.scanPicker.show((res: any) => {
                this.type = res.newlyRecognizedCodes[0].symbology;
                this.cod = res.newlyRecognizedCodes[0].data;
                this.navCtrl.push(ProductComponent, {
                    product: {
                        cod: this.cod,
                        coords: this.coords
                    }
                });
            }, null, (error: any) => {
                console.log("Error: ");
                console.log(error);
            });

        } else {
            this.navCtrl.push(ProductComponent, {
                product: {
                    cod: "4005808837359",
                    coords: this.coords
                }
            });
        }

    }
}

