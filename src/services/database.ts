/**
 * Created by flywood on 05.03.17.
 */
import { SQLite }           from 'ionic-native';
import {Injectable}         from "@angular/core";
import {Product}            from "../interfaces/product";
import {Platform}           from "ionic-angular";

@Injectable()
export class DataBase {
     base: SQLite;
    constructor(public platform: Platform) {
        this.platform.ready().then(() => {
            if ((<any> window).cordova) {
                this.base = new SQLite();
                this.base.openDatabase({
                    name: 'data.db',
                    location: 'default' // the location field is required
                }).then(() => {
                    this.base.executeSql('CREATE TABLE IF NOT EXISTS check_table(id INTEGER PRIMARY KEY, cod varchar(13), name TEXT, price NUMBER)', {})
                        .then(() => {

                        }, (err) => {
                        console.error('Unable to execute sql: ', err);
                    });
                }, (err) => {
                    console.error('Unable to open database: ', err);
                });
            }
        });
    }

    onSQLError(error: any) {
        console.log('error');
        console.log(error);

    }

    addProduct(product: Product): Promise<any> {
        let sql = 'INSERT INTO check_table(cod, name, price) VALUES("' +product.cod + '", "' + product.productName + '", ' + product.price + ');'
        return this.base.executeSql(sql, {});
        /*return this.base.transaction((tr) =>{
            console.log('tr');
            console.log(tr);
            let sql = 'INSERT INTO check_table(cod, name, price) VALUES("' +product.cod + '", "' + product.productName + '", ' + product.price + ');'
            return  tr.executeSql(sql);
        });*/
    }



}


