import {NgModule, ErrorHandler}                     from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler}   from 'ionic-angular';
import {MyApp}                                      from './app.component';
import {Page1}                                      from '../pages/page1/page1';
import {Page2}                                      from '../pages/page2/page2';
import {Main}                                       from '../pages/main/main.component';
import {ProductComponent}                           from '../pages/product/product.component';
import {Shops}                                      from '../pages/shops/shops.component';
import {BackendService}                             from '../services/backend';
import {Shop} from "../pages/shop/shop.component";

@NgModule({
    declarations: [
        MyApp,
        Page1,
        Page2,
        Main,
        Shops,
        ProductComponent,
        Shop
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page1,
        Page2,
        Main,
        Shops,
        ProductComponent,
        Shop
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BackendService]
})
export class AppModule {
}
