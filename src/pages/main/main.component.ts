/**
 * Created by flywood on 04.02.17.
 */
import { Component }            from '@angular/core';

import {NavController,
    Platform,
    LoadingController}          from 'ionic-angular';
import {ProductComponent}       from '../product/product.component';
import {SCANDIT_KEY}            from '../../app/config';
import {ICoords, Product}                from '../../interfaces/product';
import {Geolocation, Toast}          from 'ionic-native';
import {BackendService} from "../../services/backend";

@Component({
    templateUrl: 'main.html'
})
export class Main {
    private scanSettings: any;
    private scanPicker: any;
    public cod: string;
    public type: string;
    coords: ICoords;

    constructor(public navCtrl: NavController, public platform: Platform, public backend: BackendService, public loadingCtrl: LoadingController){

        this.platform.ready().then(() => {
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

                    Geolocation.getCurrentPosition().then((resp) => {
                        // resp.coords.latitude
                        // resp.coords.longitude
                    }).catch((error) => {
                        console.log('Error getting location', error);
                    });

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

                let product = new Product({
                    cod: this.cod,
                    coords: this.coords
                });
                this.getProductName(product);
            }, null, (error: any) => {
                console.log("Error: ");
                console.log(error);
            });

        } else {
            let product: Product = new Product({
                cod: "4005808837359",
                coords: this.coords
            });
            this.getProductName(product);
        }
    }

    getProductName(product: Product): void {
        let loading = this.loadingCtrl.create({
            content: 'Получение названия товара... ',
            dismissOnPageChange: true
        });
        loading.present();

        this.backend.getProductName(product.cod).subscribe((data) => {
            console.log(data);
            console.log(product);
            if (data.status === 200) {
                product.productName = data.names[0];
                this.navCtrl.push(ProductComponent, {product: product});
            } else {
                console.log('show toast');
                Toast.show("Название товара не найдено", '10000', 'center').subscribe(
                    toast => {
                        this.navCtrl.push(ProductComponent, {product: product});
                    }
                );
            }
        });
    }

    showCheck(): void {

    }

    resetCheck(): void {

    }
}

