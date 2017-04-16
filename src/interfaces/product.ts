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
    price?: number;
}

export class Product implements IProduct {
    cod: string;
    coords: ICoords;
    productName: string;
    price: number;
    constructor(obj? : IProduct) {
        this.cod = obj.cod || '';
        this.coords = obj.coords || {latitude: 54.101853, longitude: 37.579653};
        this.productName = obj.productName || '';
        this.price = obj.price || 0;
    }
}
export class ReceiptProduct extends Product {
    prod_count: number = 1;

    constructor(obj?) {
        super(obj);
        this.prod_count = obj.prod_count || 1;
    }
}

export class ReceiptProductSum extends ReceiptProduct {
    prod_count_sum: number = 1;
    constructor(obj?) {
        super(obj);
        this.prod_count_sum = obj.prod_count_sum || 1;
    }
}
