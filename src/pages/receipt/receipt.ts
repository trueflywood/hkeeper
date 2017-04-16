import {Component}                  from '@angular/core';
import {AlertController}            from 'ionic-angular';
import {ReceiptProduct,
    ReceiptProductSum
}                                   from "../../interfaces/product";
import {DataBase}                   from "../../services/database";

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
    products: ReceiptProductSum[] = [];
    sumReceipt: any[] = [];

    constructor(
        /*public navCtrl: NavController,
        public navParams: NavParams,*/
        public database: DataBase,
        public alertCtrl: AlertController
    ) {
        this.getPriceList();
    }

    getData(): void {

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

    onEdit(cod: string, price: number): void {

        this.database.getReceiptProduct(cod, price).then((data) => {
            let products = this.database.getRowsType(data, ReceiptProductSum);
            products[0].prod_count = products[0].prod_count_sum;
            this.showPrompt(products[0]);
        });
    }

    showPrompt(product: ReceiptProduct) {
        let prompt = this.alertCtrl.create({
            title: 'Количество',
            message: "Ведите количество товара ",
            cssClass: 'count-inputs',
            inputs: [
                {
                    name: 'count',
                    placeholder: 'Кол-во',
                    type: 'number',
                    value: product.prod_count.toString()
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
                        product.prod_count = data.count;
                        this.updateProduct(product);
                    }
                }
            ]
        });
        prompt.present();
    }

    updateProduct(product: ReceiptProduct): void {
        this.database.delReceiptRows(product.cod, product.price).then(() => {
            return this.database.addProduct(product);
        }).then(() => {
            this.getPriceList();
        });

    }
}
