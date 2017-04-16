/**
 * Created by flywood on 05.03.17.
 */
// import { SQLite }           from 'ionic-native';
import {SQLite, SQLiteObject}           from '@ionic-native/sqlite';
import {Injectable}         from "@angular/core";
import {Product, ReceiptProduct}            from "../interfaces/product";
import {Platform}           from "ionic-angular";

@Injectable()
export class DataBase {
    base: SQLiteObject;
    webSQLBase: any;
    constructor(public platform: Platform, private sqlite: SQLite) {
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
        let arrCreateTable: string[] = [
            'CREATE TABLE IF NOT EXISTS receipt_table(id INTEGER PRIMARY KEY, cod varchar(13), productName TEXT, price NUMBER, prod_count NUMBER)'
        ];

        if ((<any> window).cordova) {
            this.sqlite.create({
                name: 'data.db',
                location: 'default' // the location field is required
            }).then((db: SQLiteObject) => {
                this.base = db;

                for (let query of arrCreateTable) {
                    this.base.executeSql(query, [])
                        .then((data) => {
                            // console.log('table messages created', data);
                        })
                        .catch((err) => {
                            // console.log('table messages not created', err);
                        });
                }
            }, (err) => {
                console.error('Unable to open database: ', err);
            });
        } else { // TODO remove in release ???
            this.webSQLBase = (<any> window).openDatabase('ToDo', '0.1', 'A list of to do items.', 2 * 1024 * 1024);
            this.webSQLBase.transaction(function (tx) {
                for (let query of arrCreateTable) {
                    tx.executeSql(query);
                }
            });
        }
    }

    executeSql(sql: string, data: any[]): Promise<any> {
        let returnPromise;
        if ((<any> window).cordova) {
            returnPromise = this.base.executeSql(sql, data);
        } else {
            // TODO Remove from release ???

            returnPromise = new Promise((resolve, reject) => {
                this.webSQLBase.transaction((tx: any) => {
                    tx.executeSql(sql, data, (tx: any, results: any) => {
                        resolve(results);
                    }, (tx: any, error: any) => {
                        reject(error);
                    });

                });
            });
        }

        return returnPromise;
    }

    addProduct(product: ReceiptProduct): Promise<any> {
        let sql = 'INSERT INTO receipt_table(cod, productName, price, prod_count) VALUES(?, ?, ?, ?);';
        console.log('sql');
        console.log(sql);

        return this.executeSql(sql, [product.cod, product.productName, product.price, product.prod_count]);
        /*return this.base.transaction((tr) =>{
            console.log('tr');
            console.log(tr);
            let sql = 'INSERT INTO receipt_table(cod, name, price) VALUES("' +product.cod + '", "' + product.productName + '", ' + product.price + ');'
            return  tr.executeSql(sql);
        });*/
    }

    selectCheckList(): Promise<any> {
        let sql = 'SELECT *, SUM(prod_count) as prod_count_sum FROM receipt_table GROUP BY cod, price';
        return this.executeSql(sql, []);
    }

    getSumReceipt(): Promise<any> {
        let sql = 'SELECT sum(price * prod_count) as sum_price FROM receipt_table';
        return this.executeSql(sql, []);
    }

    clearReceipt(): Promise<any> {
        let sql = 'DELETE  FROM receipt_table';
        return this.executeSql(sql, []);
    }

    deleteProductFromReceipt(id: number): Promise<any> {
        let sql = 'DELETE  FROM receipt_table WHERE id=?';
        return this.executeSql(sql, [id]);
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

    delReceiptRows(code: string, price: number): Promise<any> {
        let sql = 'delete from receipt_table where cod = ? and price = ?';
        return this.executeSql(sql, [code, price]);
    }

}


