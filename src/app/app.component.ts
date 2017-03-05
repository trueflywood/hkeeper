import {Component, ViewChild}     from '@angular/core';
import {Nav, Platform}            from 'ionic-angular';
import {StatusBar, Splashscreen}  from 'ionic-native';

import {Page2}                    from '../pages/page2/page2';
import {Main}                     from '../pages/main/main.component';
import {Shops}                    from '../pages/shops/shops.component';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = Main;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Главная', component: Main},
            {title: 'Магазины', component: Shops},
            //  { title: 'Плановые покупки', component: PlannedPurchase },
            {title: 'Обратная связь', component: Page2},
            {title: 'О программе', component: Page2},
            {title: 'Тест 2', component: Page2}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (this.platform.is('cordova')) {
                StatusBar.styleDefault();
                Splashscreen.hide();
            }
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
