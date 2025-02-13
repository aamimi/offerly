import { IImage } from '@interfaces/Product/Image';

export interface IProduct {
    slug: string;
    title: string;
    summary: string;
    price: number;
    discount_price: number;
    thumbnail: IImage;
    rating: number;
}