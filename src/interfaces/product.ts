/**
 * Created by flywood on 27.02.17.
 */
export interface ICoords {
    accuracy?: number;
    altitude?: number;
    altitudeAccuracy?: number;
    heading?: any;
    latitude: number;
    longitude: number;
    speed?: number;
}

export interface IProduct {
    cod: string;
    coords: ICoords;
    productName?: string;
    price?: string;
}

export class Product implements IProduct {
    cod: string;
    coords: ICoords;
    productName: string;
    price: string;
    constructor(obj? : IProduct) {
        this.cod = obj.cod || '';
        this.coords = obj.coords || {latitude: 54.101853, longitude: 37.579653};
        this.productName = obj.productName || '';
        this.price = obj.price || '';
    }
}
export class ReceiptProduct extends Product {
    count: number = 1;
    constructor(obj?) {
        super(obj);
        this.count = obj.count || 1;
    }
}
