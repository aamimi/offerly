import { IImage } from '@interfaces/Product/Image';

export interface IProduct {
    slug: string;
    title: string;
    summary: string;
    description: string;
    conditions: string;
    instructions: string;
    price: number;
    discount_price: number;
    rating: number;
    images: IImage[];
}