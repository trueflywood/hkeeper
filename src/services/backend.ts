/**
 * Created by flywood on 27.02.17.
 */
import {Injectable}                     from '@angular/core';
import {SERVER_URL, GOOGLE_PLACES_KEY}  from '../app/config';
import {Http, Headers, RequestOptions}  from '@angular/http';
import {Observable}                     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {ICoords}                        from '../interfaces/product';

/*let favorites = [],
    propertiesURL = SERVER_URL + '/properties',
    favoritesURL = propertiesURL + '/favorites';*/

@Injectable()
export class BackendService {
    http: Http;
    // TODO add prefix for proxy
    //pefix: string;
    constructor (http: Http) {
        this.http = http;
        //this.pefix = ((<any> window).cordova)? '' : 'http://localhost:1337';
    }

    /*findAll() {
        return this.http.get(propertiesURL)
            .map(res => res.json())
            .catch(this.handleError);
    }*/

    getRequest(url): Observable<any> {
        // let body = JSON.stringify(property);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        url = SERVER_URL + url;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    postRequest(url, data): Observable<any> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getShopList(coords: ICoords): Observable<any> {
        let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coords.latitude +', ' + coords.longitude + '&radius=200&name=%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD&key=' + GOOGLE_PLACES_KEY;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getProductName(cod: string): Observable<any> {
        let url = 'card/name/' + cod;
        return this.getRequest(url);
    }

}
