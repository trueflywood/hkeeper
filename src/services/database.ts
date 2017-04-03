/**
 * Created by flywood on 05.03.17.
 */
import { SQLite }           from 'ionic-native';
import {Injectable}         from "@angular/core";
import {Product, ReceiptProduct}            from "../interfaces/product";
import {Platform}           from "ionic-angular";

@Injectable()
export class DataBase {
     base: SQLite;
    constructor(public platform: Platform) {
        console.log('constructor');
        this.platform.ready().then(() => {
            console.log('platform.ready');
            this.prepareDB();
        });
    }

    onSQLError(error: any) {
        console.log('error');
        console.log(error);
    }
    prepareDB(): void {
        if ((<any> window).cordova) {
            this.base = new SQLite();
            this.base.openDatabase({
                name: 'data.db',
                location: 'default' // the location field is required
            }).then(() => {
                this.base.executeSql('CREATE TABLE IF NOT EXISTS receipt_table(id INTEGER PRIMARY KEY, cod varchar(13), productName TEXT, price NUMBER, prod_count NUMBER)', {})
                    .then(() => {

                    }, (err) => {
                        console.error('Unable to execute sql: ', err);
                    });
            }, (err) => {
                console.error('Unable to open database: ', err);
            });
        }
    }

    addProduct(product: ReceiptProduct): Promise<any> {
        let sql = 'INSERT INTO receipt_table(cod, productName, price, prod_count) VALUES(?, ?, ?, ?);';
        console.log('sql');
        console.log(sql);

        return this.base.executeSql(sql, [product.cod, product.productName, product.price, product.count]);
        /*return this.base.transaction((tr) =>{
            console.log('tr');
            console.log(tr);
            let sql = 'INSERT INTO receipt_table(cod, name, price) VALUES("' +product.cod + '", "' + product.productName + '", ' + product.price + ');'
            return  tr.executeSql(sql);
        });*/
    }

    selectCheckList(): Promise<any> {
        let sql = 'SELECT * FROM receipt_table';
        return this.base.executeSql(sql, {});
    }

    getSumReceipt(): Promise<any> {
        let sql = 'SELECT sum(price * prod_count) as sum_price FROM receipt_table';
        return this.base.executeSql(sql, {});
    }

    clearReceipt(): Promise<any> {
        let sql = 'DELETE  FROM receipt_table';
        return this.base.executeSql(sql, {});
    }

    deleteProductFromReceipt(id: number): Promise<any> {
        let sql = 'DELETE  FROM receipt_table WHERE id=?';
        return this.base.executeSql(sql, [id]);
    }



    getRowsType<T>(obj: any, type: { new (l: any): T; }): T[] {
        let arrRows: T[] = [];
        for (let i = obj.rows.length - 1; i >= 0; i--) {
            arrRows.push(new type(obj.rows.item(i)));
        }
        return arrRows;
    }

    getRowsSimple<T>(obj: any): T[] {
        let arrRows: T[] = [];
        for (let i = obj.rows.length - 1; i >= 0; i--) {
            arrRows.push(obj.rows.item(i));
        }
        return arrRows;
    }

}


