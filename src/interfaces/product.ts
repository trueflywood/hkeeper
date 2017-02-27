/**
 * Created by flywood on 27.02.17.
 */
export interface ICoords {
    accuracy?: number
    altitude?: number
    altitudeAccuracy?: number
    heading?: any
    latitude: number
    longitude: number
    speed?: number
}

export interface IProduct {
    cod: string,
    coords: ICoords
}

export class Product implements IProduct {
    cod: string;
    coords: ICoords;
    constructor(obj? : IProduct) {
        this.cod = obj.cod || '';
        this.coords = obj.coords || {latitude: 54.101853, longitude: 37.579653};
    }
}
